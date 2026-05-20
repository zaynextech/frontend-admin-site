export interface UploadedFile {
  id: string;

  fileName: string;

  fileUrl: string;

  fileType: string;

  uploadedBy: string;

  createdAt: string;
}

export interface Project {
  id: string;

  projectName: string;

  files?: UploadedFile[];
}