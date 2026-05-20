import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image as ImageIcon, Edit2, Trash2, CheckCircle2, LayoutGrid, Server, Settings2 } from "lucide-react";
import ConfirmModal from "../components/ui/ConfirmModal";
import Loader from "../components/ui/Loader";

// --- Types & Constants ---
interface Project {
  id: string;
  projectName: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  rating: string;
  liveDemoUrl: string;
  thumbnailImage: string;
  showcaseImage1: string;
  showcaseImage2: string;
  showcaseImage3: string;
  features: string;
  techStack: string;
  suitableFor: string;
  deploymentTime: string;
  startingPrice: string;
  featured: boolean;
  bookingEnabled: boolean;
}

const CATEGORY_OPTIONS = [ "School Management System", "Clinic/Hospital Management", "CRM Platform", "ERP Dashboard", "Booking System", "Trading Journal SaaS", "HR Management", "Inventory POS", "Real Estate Portal", "LMS Platform", "Fintech Dashboard", "Hotel Management", "Custom SaaS" ];
const FEATURE_OPTIONS = [
  "User Authentication",
  "Role Based Access",
  "Analytics Dashboard",
  "Reports Export",
  "Notifications",
  "Payment Integration",
  "Attendance",
  "Appointment Booking",
  "AI Assistant",
  "CRM Pipeline",
  "Invoice Generator",
  "Cloud Backup",
  "Mobile Responsive",
  "Admin Control",
  "Multi Tenant",
  "Audit Logs",
  "API Integration",
  "Email Automation",

  // More Important Features
  "Dark Mode",
  "Real Time Chat",
  "Live Updates",
  "File Upload",
  "Image Optimization",
  "Search & Filter",
  "SEO Optimization",
  "Social Login",
  "Two Factor Authentication",
  "Session Management",
  "User Profile Management",
  "Activity Tracking",
  "Data Visualization",
  "Calendar Integration",
  "Task Management",
  "Team Collaboration",
  "Subscription Plans",
  "Coupon System",
  "Shopping Cart",
  "Wishlist",
  "Order Tracking",
  "Inventory Management",
  "Multi Language Support",
  "Theme Customization",
  "Drag And Drop Builder",
  "PDF Generation",
  "CSV Import Export",
  "Webhook Support",
  "REST API",
  "GraphQL API",
  "Server Side Rendering",
  "Static Site Generation",
  "Progressive Web App",
  "Offline Support",
  "Caching System",
  "Performance Monitoring",
  "Error Logging",
  "Security Monitoring",
  "Backup & Restore",
  "Content Management System",
  "Blog Management",
  "Video Streaming",
  "Live Streaming",
  "Chatbot Integration",
  "Push Notifications",
  "Location Tracking",
  "Maps Integration",
  "QR Code Scanner",
  "OTP Verification",
  "Admin Analytics",
  "AI Recommendations",
  "Voice Search",
  "Realtime Collaboration",
  "Comment System",
  "Rating & Reviews",
  "User Feedback System",
  "Feature Flags",
  "A/B Testing",
  "Fraud Detection",
  "Document Verification",
  "KYC Verification",
  "Blockchain Integration",
  "IoT Dashboard",
  "Marketplace System",
  "Affiliate System",
  "Referral Program",
  "Workflow Automation",
  "Custom Forms",
  "Dynamic Routing",
  "Microservices Support",
  "Docker Support",
  "CI/CD Integration"
];
const TECH_OPTIONS = [ "React","Next.js","TypeScript","Tailwind","Node.js","Express","NestJS", "Laravel","Django","PostgreSQL","MySQL","MongoDB","Redis","Docker", "AWS","Railway","Vercel","Cloudinary","OpenAI","LangChain" ];
const SUITABLE_OPTIONS = [
  "Schools",
  "Universities",
  "Clinics",
  "Hospitals",
  "Enterprises",
  "Startups",
  "Hotels",
  "Restaurants",
  "Brokers",
  "Agencies",
  "NGOs",
  "Ecommerce",

  // More React/Next.js Suitable Industries
  "Banks",
  "FinTech",
  "Insurance Companies",
  "Real Estate",
  "Law Firms",
  "Gyms",
  "Fitness Centers",
  "Pharmacies",
  "Travel Agencies",
  "Tourism Companies",
  "Airlines",
  "Logistics Companies",
  "Warehouses",
  "Construction Companies",
  "Manufacturing",
  "Cybersecurity Firms",
  "IT Companies",
  "Software Companies",
  "Marketing Agencies",
  "Digital Agencies",
  "Freelancers",
  "Portfolio Websites",
  "Blog Platforms",
  "News Portals",
  "Media Companies",
  "Streaming Platforms",
  "Event Management",
  "Ticket Booking",
  "Food Delivery",
  "Ride Sharing",
  "Car Rental",
  "Online Learning",
  "EdTech Platforms",
  "Job Portals",
  "Recruitment Agencies",
  "HR Management",
  "CRM Systems",
  "ERP Systems",
  "Inventory Systems",
  "POS Systems",
  "Accounting Firms",
  "Trading Platforms",
  "Crypto Platforms",
  "Investment Firms",
  "Social Networks",
  "Community Platforms",
  "Dating Apps",
  "Gaming Platforms",
  "Auction Platforms",
  "Marketplace Platforms",
  "Subscription Services",
  "Membership Platforms",
  "Religious Organizations",
  "Government Services",
  "Smart City Projects",
  "IoT Platforms",
  "AI Platforms",
  "Research Centers",
  "Libraries",
  "Coworking Spaces",
  "Beauty Salons",
  "Spa Centers",
  "Fashion Brands",
  "Jewelry Stores",
  "Electronics Stores",
  "Furniture Stores",
  "Pet Care Services",
  "Veterinary Clinics"
];
const DEPLOYMENT_OPTIONS = ["3 Days","1 Week","2 Weeks","1 Month","2 Months","Custom"];
const RATING_OPTIONS = ["4.5","4.7","4.8","4.9","5.0"];



const emptyForm = {
  projectName: "", slug: "", category: CATEGORY_OPTIONS[0], shortDescription: "", longDescription: "", rating: "4.9", liveDemoUrl: "", thumbnailImage: "", showcaseImage1: "", showcaseImage2: "", showcaseImage3: "", features: "", techStack: "", suitableFor: SUITABLE_OPTIONS[0], deploymentTime: "2 Weeks", startingPrice: "", featured: false, bookingEnabled: true,
};

// --- Reusable UI Components (Moved OUTSIDE the main render to satisfy React rules) ---
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="mb-1.5 block text-xs font-medium text-zinc-400">{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`w-full rounded-lg border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors ${props.className || ''}`} />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`w-full rounded-lg border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors ${props.className || ''}`}>
    {props.children}
  </select>
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`w-full rounded-lg border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors ${props.className || ''}`} />
);

// Fixed typing from `any` to `React.ElementType`
const SectionHeader = ({ title, icon: Icon }: { title: string, icon: React.ElementType }) => (
  <div className="mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
    <Icon size={18} className="text-zinc-500" />
    <h2 className="text-lg font-medium text-zinc-100">{title}</h2>
  </div>
);

// ImageUploader pulled outside to prevent re-mounting on every re-render
const ImageUploader = ({
  label,
  value,
  loading,
  onUpload,
}: {
  label: string;
  value: string;
  loading: boolean;
  onUpload: (file: File) => void;
}) => (
  <div>
    <Label>{label}</Label>
    <div className="relative mt-1 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-zinc-900/30 transition-colors hover:bg-zinc-900/80 overflow-hidden">
      <input
        type="file"
        onChange={(e) => e.target.files && onUpload(e.target.files[0])}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center text-zinc-400">

          <div
            className="
              mb-3
              h-8
              w-8
              animate-spin
              rounded-full
              border-2
              border-cyan-500/20
              border-t-cyan-400
            "
          />

          <div className="flex min-h-screen items-center justify-center">
            <Loader />
          </div>

        </div>
      ) : value ? (
        <img
          src={value}
          className="
            h-full
            w-full
            rounded-lg
            object-cover
            p-1
          "
          alt="preview"
        />
      ) : (
        <div className="flex flex-col items-center text-zinc-500">

          <ImageIcon
            size={24}
            className="mb-2"
          />

          <span className="text-xs">
            Click to upload
          </span>

        </div>
      )}
    </div>
  </div>
);

// --- Main Component ---
const PortfolioManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, ] = useState<Record<string, boolean>>({});

 const fetchProjects = () => {
  axios
    .get(
      `${import.meta.env.VITE_API_URL}/portfolio`
    )
    .then((res) =>
      setProjects(
        res.data.projects
      )
    );
};
  useEffect(() => { fetchProjects(); }, []);

  const handleText = (name: string, value: string | boolean) => {
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "projectName") {
        updated.slug = String(value).toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
      }
      return updated;
    });
  };

  const toggleSelection = (field: "features" | "techStack", value: string) => {
    const current = form[field] ? form[field].split(",") : [];
    const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    setForm((prev) => ({ ...prev, [field]: updated.join(",") }));
  };

const uploadImage = async (
  file: File,
  fieldName: string
) => {

  const data =
    new FormData();

  data.append(
    "image",
    file
  );

  try {

    const res =
      await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    setForm((prev) => ({
      ...prev,
      [fieldName]:
        res.data.imageUrl,
    }));

  } catch (error) {

    console.error(
      "Upload failed",
      error
    );

  }
};

const submitProject =
  async () => {

    if (editingId) {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/portfolio/${editingId}`,
        form
      );

    } else {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/portfolio`,
        form
      );

    }

    setForm(emptyForm);

    setEditingId(null);

    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    const confirmed =
  await ConfirmModal({
    title: "Delete Project?",
    text:
      "This action cannot be undone.",
    confirmText:
      "Yes, delete",
  });

if (!confirmed) {
  return;
}
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/portfolio/${id}`
    );
    fetchProjects();
  };

  const editProject = (project: Project) => {
    setEditingId(project.id);
    setForm(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-12">
        
        {/* Header */}
        <header className="mb-10 flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-zinc-100">CMS Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-500">Manage your enterprise portfolio and SaaS offerings.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          
          {/* Form Area - Takes up 2/3 of screen */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Section 1: Basic Info */}
            <section className="rounded-xl border border-white/5 bg-[#0A0A0A] p-6">
              <SectionHeader title="General Information" icon={LayoutGrid} />
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1">
                  <Label>Project Name</Label>
                  <Input value={form.projectName} onChange={(e) => handleText("projectName", e.target.value)} placeholder="e.g. Acme ERP" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>URL Slug</Label>
                  <Input value={form.slug} readOnly placeholder="auto-generated-slug" className="bg-black/50 text-zinc-500" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Category</Label>
                  <Select value={form.category} onChange={(e) => handleText("category", e.target.value)}>
                    {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                  </Select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Live Demo URL</Label>
                  <Input value={form.liveDemoUrl} onChange={(e) => handleText("liveDemoUrl", e.target.value)} placeholder="https://" />
                </div>
                <div className="col-span-2">
                  <Label>Short Description (Card preview)</Label>
                  <Textarea value={form.shortDescription} onChange={(e) => handleText("shortDescription", e.target.value)} rows={2} />
                </div>
                <div className="col-span-2">
                  <Label>Long Description (Case study body)</Label>
                  <Textarea value={form.longDescription} onChange={(e) => handleText("longDescription", e.target.value)} rows={5} />
                </div>
              </div>
            </section>

            {/* Section 2: Details & Pricing */}
            <section className="rounded-xl border border-white/5 bg-[#0A0A0A] p-6">
              <SectionHeader title="Deployment & Details" icon={Settings2} />
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label>Suitable For</Label>
                  <Select value={form.suitableFor} onChange={(e) => handleText("suitableFor", e.target.value)}>
                    {SUITABLE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Deployment Time</Label>
                  <Select value={form.deploymentTime} onChange={(e) => handleText("deploymentTime", e.target.value)}>
                    {DEPLOYMENT_OPTIONS.map((d) => <option key={d}>{d}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Starting Price ($)</Label>
                  <Input value={form.startingPrice} onChange={(e) => handleText("startingPrice", e.target.value)} placeholder="e.g. 5,000" />
                </div>
                <div>
                  <Label>Client Rating</Label>
                  <Select value={form.rating} onChange={(e) => handleText("rating", e.target.value)}>
                    {RATING_OPTIONS.map((r) => <option key={r}>{r}</option>)}
                  </Select>
                </div>
                
                {/* Toggles */}
                <div className="col-span-2 mt-4 flex gap-8 border-t border-white/5 pt-6">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input type="checkbox" checked={form.featured} onChange={(e) => handleText("featured", e.target.checked)} className="h-4 w-4 rounded border-white/10 bg-zinc-900 accent-zinc-100" />
                    <span className="text-sm font-medium text-zinc-300">Feature on Homepage</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input type="checkbox" checked={form.bookingEnabled} onChange={(e) => handleText("bookingEnabled", e.target.checked)} className="h-4 w-4 rounded border-white/10 bg-zinc-900 accent-zinc-100" />
                    <span className="text-sm font-medium text-zinc-300">Enable Booking CTA</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Section 3: Tech & Features (Pill Selectors) */}
            <section className="rounded-xl border border-white/5 bg-[#0A0A0A] p-6">
              <SectionHeader title="Architecture & Features" icon={Server} />
              
              <div className="mb-6">
                <Label>Tech Stack</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TECH_OPTIONS.map((t) => {
                    const selected = form.techStack.split(",").includes(t);
                    return (
                      <button key={t} type="button" onClick={() => toggleSelection("techStack", t)}
                        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${selected ? "border-zinc-100 bg-zinc-100 text-zinc-900" : "border-white/10 bg-transparent text-zinc-400 hover:border-white/20 hover:text-zinc-200"}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Core Features</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {FEATURE_OPTIONS.map((f) => {
                    const selected = form.features.split(",").includes(f);
                    return (
                      <button key={f} type="button" onClick={() => toggleSelection("features", f)}
                        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${selected ? "border-zinc-100 bg-zinc-100 text-zinc-900" : "border-white/10 bg-transparent text-zinc-400 hover:border-white/20 hover:text-zinc-200"}`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Section 4: Media Uploads */}
            <section className="rounded-xl border border-white/5 bg-[#0A0A0A] p-6">
              <SectionHeader title="Media Assets" icon={ImageIcon} />
              <div className="grid grid-cols-2 gap-5">
                <ImageUploader
  label="Main Thumbnail (16:9)"
  value={form.thumbnailImage}
  loading={uploading.thumbnailImage}
  onUpload={(file) => uploadImage(file, "thumbnailImage")}
/>

<ImageUploader
  label="Showcase Image 1"
  value={form.showcaseImage1}
  loading={uploading.showcaseImage1}
  onUpload={(file) => uploadImage(file, "showcaseImage1")}
/>

<ImageUploader
  label="Showcase Image 2"
  value={form.showcaseImage2}
  loading={uploading.showcaseImage2}
  onUpload={(file) => uploadImage(file, "showcaseImage2")}
/>

<ImageUploader
  label="Showcase Image 3 (Wide)"
  value={form.showcaseImage3}
  loading={uploading.showcaseImage3}
  onUpload={(file) => uploadImage(file, "showcaseImage3")}
/>
          
              </div>
            </section>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 pt-4 pb-20">
              {editingId && (
                <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }} className="rounded-lg px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100">
                  Cancel
                </button>
              )}
              <button onClick={submitProject} className="flex items-center gap-2 rounded-lg bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white">
                <CheckCircle2 size={16} />
                {editingId ? "Save Changes" : "Publish Project"}
              </button>
            </div>
          </div>

          {/* Right Sidebar: Published Projects List */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 rounded-xl border border-white/5 bg-[#0A0A0A] p-6">
              <h2 className="mb-6 text-sm font-medium text-zinc-100">Published Projects</h2>
              
              <div className="flex flex-col gap-3">
                {projects.length === 0 ? (
                  <p className="text-sm text-zinc-500 text-center py-10">No projects uploaded yet.</p>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="group relative flex flex-col gap-2 rounded-lg border border-white/5 bg-black/50 p-4 transition-colors hover:border-white/10">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-200">{project.projectName}</h3>
                        <p className="mt-1 text-xs text-zinc-500">{project.category}</p>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-3">
                        <span className={`text-[10px] font-medium uppercase tracking-widest ${project.featured ? 'text-cyan-500' : 'text-zinc-600'}`}>
                          {project.featured ? 'Featured' : 'Standard'}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => editProject(project)} className="p-1.5 text-zinc-500 transition-colors hover:text-zinc-100">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => deleteProject(project.id)} className="p-1.5 text-zinc-500 transition-colors hover:text-red-400">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;