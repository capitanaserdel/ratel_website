import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ status: 'error', message: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const extension = path.extname(originalName).toLowerCase();

    // Check extensions
    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
      return NextResponse.json({ status: 'error', message: 'Invalid Image format. Only jpg, jpeg or png.' });
    }

    const targetDir = path.join(process.cwd(), 'public', 'uploads');
    // Ensure directory exists
    await fs.mkdir(targetDir, { recursive: true });

    // Check if file exists to prevent overwrites or handle naming conflicts like the PHP script
    const targetFile = path.join(targetDir, originalName);
    try {
      await fs.access(targetFile);
      // File exists!
      return NextResponse.json({ 
        status: 'error', 
        message: `Image name already exists (${originalName}) please rename and upload it again.` 
      });
    } catch {
      // File doesn't exist, we can proceed
    }

    await fs.writeFile(targetFile, buffer);

    return NextResponse.json({
      status: 'success',
      file: originalName
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to upload' }, { status: 500 });
  }
}
