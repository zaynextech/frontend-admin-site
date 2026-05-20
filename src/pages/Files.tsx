// Files.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

import Loader from "../components/ui/Loader";
import ConfirmModal from "../components/ui/ConfirmModal";

import FilesHeader from "../components/files/FilesHeader";
import FilesUploadCard from "../components/files/FilesUploadCard";
import ProjectFilesCard from "../components/files/ProjectFilesCard";
import EditFileModal from "../components/files/EditFileModal";

import type {
  Project,
  UploadedFile
} from "../types/file.types";

const Files = () => {

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [projectId, setProjectId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [expandedProject, setExpandedProject] =
    useState<string | null>(null);

  const [editingFile, setEditingFile] =
    useState<UploadedFile | null>(
      null
    );

  const [newFileName, setNewFileName] =
    useState("");

  /* FETCH */
  const fetchProjects =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/projects`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setProjects(
          response.data.projects || []
        );

      } catch (
        error
      ) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();

  }, []);

  /* TOTAL FILES */
  const totalFiles =
    useMemo(() => {

      return projects.reduce(
        (total, project) =>

          total +
          (project.files?.length || 0),

        0
      );

    }, [projects]);

  /* UPLOAD */
  const uploadFile =
    async () => {

      if (
        !selectedFile ||
        !projectId
      ) {

        toast.error(
          "Select file and project"
        );

        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "file",
          selectedFile
        );

        formData.append(
          "projectId",
          projectId
        );

       await axios.post(
  `${import.meta.env.VITE_API_URL}/admin/files`,
  formData,
  {
    headers: {
      Authorization:
        `Bearer ${token}`,

      "Content-Type":
        "multipart/form-data",
    },
  }
);

        toast.success(
          "File uploaded successfully"
        );

        setSelectedFile(null);

        setProjectId("");

        fetchProjects();

      } catch (
        error
      ) {

        console.log(error);

        toast.error(
          "Failed to upload file"
        );

      }
    };

  /* DELETE */
  const deleteFile =
    async (
      id: string
    ) => {

      const confirmed =
        await ConfirmModal({
          title:
            "Delete File?",
          text:
            "This action cannot be undone.",
          confirmText:
            "Yes, delete",
        });

      if (!confirmed) {
        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

       await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/files/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "File deleted successfully"
        );

        fetchProjects();

      } catch (
        error
      ) {

        console.log(error);

        toast.error(
          "Failed to delete file"
        );

      }
    };

  /* OPEN EDIT */
  const openEditModal =
    (
      file: UploadedFile
    ) => {

      setEditingFile(file);

      setNewFileName(
        file.fileName
      );
    };

  /* UPDATE */
  const updateFile =
    async () => {

      if (!editingFile) {
        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

       await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/files/${editingFile.id}`,
        {
          fileName:
            newFileName,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

        toast.success(
          "File updated successfully"
        );

        setEditingFile(null);

        fetchProjects();

      } catch (
        error
      ) {

        console.log(error);

        toast.error(
          "Failed to update file"
        );

      }
    };

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <Loader />

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black p-6 text-white">

      {/* BG GLOW */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_40%)]" />

      {/* HEADER */}
      <FilesHeader
        totalFiles={
          totalFiles
        }
      />

      {/* UPLOAD */}
      <FilesUploadCard
        projects={projects}

        selectedFile={
          selectedFile
        }

        setSelectedFile={
          setSelectedFile
        }

        projectId={
          projectId
        }

        setProjectId={
          setProjectId
        }

        uploadFile={
          uploadFile
        }
      />

      {/* PROJECT FILES */}
      <div className="space-y-6">

        {projects.map(
          (project) => (

            <ProjectFilesCard
              key={project.id}

              project={project}

              expandedProject={
                expandedProject
              }

              setExpandedProject={
                setExpandedProject
              }

              openEditModal={
                openEditModal
              }

              deleteFile={
                deleteFile
              }
            />

          )
        )}

      </div>

      {/* EDIT MODAL */}
      <EditFileModal
        editingFile={
          editingFile
        }

        newFileName={
          newFileName
        }

        setNewFileName={
          setNewFileName
        }

        updateFile={
          updateFile
        }

        setEditingFile={
          setEditingFile
        }
      />

    </section>
  );
};

export default Files;