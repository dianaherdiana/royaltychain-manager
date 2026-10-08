import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  Upload,
  ImagePlus,
  CircleCheck,
  ArrowLeft,
  Blocks,
  ShieldCheck,
  Plus,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, Modal, StatusBadge } from "./ui";
import { useDemo } from "./demo-provider";
import { contract, initialWorks, type Work } from "@/lib/demo-data";
export function RegisterPage() {
  const { works, addWork } = useDemo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Digital Art");
  const [license, setLicense] = useState("Commercial");
  const [start, setStart] = useState("2026-10-08");
  const [end, setEnd] = useState("2027-10-08");
  const [rate, setRate] = useState(5);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState<Work | null>(null);
  const [uploading, setUploading] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!image) {
      setError("Please upload an artwork image.");
      return;
    }
    if (end <= start) {
      setError("License end date must be after the start date.");
      return;
    }
    const id = String(Math.max(...works.map((w) => Number(w.id))) + 1).padStart(3, "0");
    const work: Work = {
      id,
      title: title.trim(),
      description,
      category,
      license,
      start,
      end,
      royalty: rate,
      image,
      status: end < "2026-10-08" ? "EXPIRED" : "ACTIVE",
      history: [
        {
          title: "NFT registered",
          date: "Oct 08, 2026",
          note: "Mock transaction · 0xDEMO..." + id,
        },
        {
          title: license + " license activated",
          date: start,
          note: `Royalty rate ${rate}% · Ends ${end}`,
        },
      ],
    };
    addWork(work);
    setRegistered(work);
    setError("");
  }
  return (
    <>
      <Link to="/works" className="back-link">
        <ArrowLeft size={16} />
        Back to My Works
      </Link>
      <PageHeading
        title="Register New Work"
        subtitle="Bring your creativity on-chain. Register your artwork and set its license."
      />
      <form onSubmit={submit}>
        <div className="registration-grid">
          <section className="panel form-panel">
            <div className="form-section-heading">
              <span className="stat-icon tone-primary">
                <ImagePlus size={21} />
              </span>
              <div>
                <h2>Artwork Information</h2>
                <p>The details that make your work yours.</p>
              </div>
            </div>
            <label className="field-label">
              Artwork Title <span>*</span>
              <input
                required
                maxLength={100}
                placeholder="Give your artwork a name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="field-label">
              Description <span>*</span>
              <textarea
                required
                maxLength={1500}
                rows={4}
                placeholder="Tell the story behind your artwork..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="field-label">
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {[
                  "Digital Art",
                  "3D Art",
                  "Pixel Art",
                  "Photography",
                  "Illustration",
                  "Animation",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <span className="field-label">
              Upload Artwork <span>*</span>
            </span>
            <label className={`upload-zone ${image ? "has-image" : ""}`}>
              {image ? (
                <img src={image} alt="Uploaded artwork preview" width={400} height={200} />
              ) : (
                <>
                  <span className="upload-icon">
                    <Upload size={23} />
                  </span>
                  <strong>Click to upload your artwork</strong>
                  <span>PNG, JPG, WEBP · Up to 10 MB</span>
                </>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                aria-label="Upload Artwork"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (
                    !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
                    file.size > 10 * 1024 * 1024
                  ) {
                    setError("Use a PNG, JPG, or WEBP image under 10 MB.");
                    return;
                  }
                  setUploading(true);
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") {
                      setImage(reader.result);
                      setFileName(file.name);
                      setError("");
                    }
                    setUploading(false);
                  };
                  reader.onerror = () => {
                    setError("Image could not be read. Please try again.");
                    setUploading(false);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            {fileName && <span className="file-name">{fileName}</span>}
          </section>
          <section className="panel form-panel">
            <div className="form-section-heading">
              <span className="stat-icon tone-green">
                <FileLicenseIcon />
              </span>
              <div>
                <h2>License & Royalty</h2>
                <p>Define how your artwork can be used.</p>
              </div>
            </div>
            <label className="field-label">
              License Type
              <select value={license} onChange={(e) => setLicense(e.target.value)}>
                {["Personal", "Commercial", "Exclusive", "Non-Exclusive"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <div className="license-info">
              <Info size={17} />
              <p>
                {license === "Personal"
                  ? "For personal use only. Commercial use is not permitted."
                  : license === "Commercial"
                    ? "Allows commercial use within the specified license period."
                    : license === "Exclusive"
                      ? "Usage rights granted exclusively to a single license holder."
                      : "Usage rights may be granted to multiple license holders."}
              </p>
            </div>
            <div className="two-fields">
              <label className="field-label">
                License Start Date
                <input
                  required
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </label>
              <label className="field-label">
                License End Date
                <input
                  required
                  type="date"
                  value={end}
                  min={start}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </label>
            </div>
            <label className="field-label">
              Royalty Percentage
              <div className="suffix-input">
                <input
                  required
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
                <span>%</span>
              </div>
            </label>
            <p className="field-help">Earn a percentage of every eligible resale.</p>
            <div className="royalty-example">
              <span>Example sale</span>
              <strong>1.00 ETH</strong>
              <span>Your royalty ({rate}%)</span>
              <strong className="text-primary">{(rate / 100).toFixed(3)} ETH</strong>
            </div>
            <div className="form-demo-note">
              <ShieldCheck size={20} />
              <div>
                <strong>Safe to explore in Demo Mode</strong>
                <p>Registration is simulated. No real blockchain transaction or gas fee.</p>
              </div>
            </div>
          </section>
        </div>
        <section className="panel preview-panel">
          <div>
            <span className="eyebrow">BEFORE YOU REGISTER</span>
            <h2>NFT Preview</h2>
            <p>A first look at your next digital collectible.</p>
          </div>
          <div className="inline-preview">
            {image ? (
              <img src={image} alt="NFT preview" width={100} height={80} />
            ) : (
              <span className="preview-placeholder">
                <ImagePlus size={30} />
              </span>
            )}
            <div>
              <h3>{title || "Your Artwork Title"}</h3>
              <p>
                {category} · {license} license
              </p>
              <StatusBadge status="ACTIVE" />
            </div>
            <div className="preview-rate">
              <span>Royalty rate</span>
              <strong>{rate}%</strong>
            </div>
          </div>
        </section>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <div className="form-actions">
          <span>
            <Blocks size={16} />
            Registration uses mock blockchain data
          </span>
          <div>
            <Button variant="outline" asChild>
              <Link to="/works">Cancel</Link>
            </Button>
            <Button type="submit" disabled={uploading}>
              <Plus />
              {uploading ? "Reading image..." : "Register NFT"}
            </Button>
          </div>
        </div>
      </form>
      <Modal
        open={!!registered}
        onClose={() => setRegistered(null)}
        title="NFT Successfully Registered ✓"
        description="Your artwork is registered in the demo environment."
      >
        <div className="success-symbol">
          <CircleCheck size={42} />
        </div>
        <dl className="detail-list">
          <dt>Token ID</dt>
          <dd>#{registered?.id}</dd>
          <dt>Contract Address</dt>
          <dd className="break-all">{contract}</dd>
          <dt>Transaction Hash</dt>
          <dd>0xDEMO...{registered?.id} (simulated)</dd>
          <dt>Royalty Rate</dt>
          <dd>{registered?.royalty}%</dd>
        </dl>
        <Button asChild className="w-full">
          <Link
            to="/works/$id"
            params={{ id: registered?.id || "001" }}
            onClick={() => setRegistered(null)}
          >
            View NFT Details
          </Link>
        </Button>
      </Modal>
    </>
  );
}
function FileLicenseIcon() {
  return <ShieldCheck size={21} />;
}
