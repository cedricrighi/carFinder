import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Sell.css";
import { DndContext } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import uploadFileImg from "/images/upload-file.svg";
import { useAuth } from "../contexts/AuthenticationProvider";

export default function Sell() {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const mileageRef = useRef<HTMLInputElement>(null);
  const consumptionRef = useRef<HTMLInputElement>(null);
  const transmissionRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    const formData = new FormData();

    try {
      formData.append("category_id", categoryRef.current?.value as string);
      formData.append("brand", brandRef.current?.value || "");
      formData.append("model", modelRef.current?.value || "");
      formData.append("year", yearRef.current?.value || "");
      formData.append("mileage", mileageRef.current?.value || "");
      formData.append("consumption", consumptionRef.current?.value || "");
      formData.append("transmission", transmissionRef.current?.value || "");
      formData.append("price", priceRef.current?.value || "");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/add-vehicle/${auth?.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        },
      );

      const dataIdVehicle = await response.json();

      const imgFormData = new FormData();

      if (file) {
        imgFormData.append("photo", file);
        const responseImage = await fetch(
          `${import.meta.env.VITE_API_URL}/api/vehicle/image?vehicle_id=${dataIdVehicle.id}`,
          {
            method: "PUT",
            body: imgFormData,
          },
        );

        if (response.ok && responseImage.ok) {
          formRef.current?.reset();
          setFile(null);
          setMessage("");
        } else {
          throw new Error("Upload failed");
        }
      }

      if (!response.ok) {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <>
      <Navbar />
      <section className="sell-section-container">
        <form className="sell-form" onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="category">Catégorie</label>
          <select name="category" id="category" ref={categoryRef} required>
            <option value="">--</option>
            <option value="1">SUV</option>
            <option value="2">Sport</option>
            <option value="3">Luxe</option>
            <option value="4">Compact</option>
            <option value="5">Hybride</option>
            <option value="6">Électrique</option>
            <option value="7">Utilitaire</option>
          </select>
          <article className="brand-and-model-input-sell">
            <div id="brand-input">
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                name="brand"
                id="brand"
                ref={brandRef}
                required
              />
            </div>
            <div>
              <label htmlFor="model">Modèle</label>
              <input
                type="text"
                name="model"
                id="model"
                ref={modelRef}
                required
              />
            </div>
          </article>
          <article className="year-and-mileage">
            <div id="year-input">
              <label htmlFor="year">Année</label>
              <input
                type="number"
                name="year"
                id="year"
                min="1900"
                max={new Date().getFullYear()}
                ref={yearRef}
                required
              />
            </div>
            <div id="mileage-input">
              <label htmlFor="mileage">Kilométrage</label>
              <input
                type="number"
                name="mileage"
                id="mileage"
                ref={mileageRef}
                required
              />
            </div>
          </article>
          <div>
            <label htmlFor="consumption" id="consumption-input">
              Consommation (l/100km)
            </label>
            <input
              type="number"
              step="0.01"
              name="consumption"
              id="consumption"
              ref={consumptionRef}
              required
            />
          </div>
          <article className="transmission-and-price">
            <div>
              <label htmlFor="transmission">Transmission</label>
              <select
                name="transmission"
                id="transmission"
                ref={transmissionRef}
                required
              >
                <option value="--">--</option>
                <option value="Automatique">Automatique</option>
                <option value="Manuelle">Manuelle</option>
                <option value="Semi-automatique">Semi-automatique</option>
              </select>
            </div>
            <div>
              <label htmlFor="price">Prix</label>
              <input
                type="number"
                name="price"
                id="price"
                ref={priceRef}
                required
              />
            </div>
          </article>
          <div>
            <DndContext>
              <div
                id="dropzone"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (event.dataTransfer.files[0].type.startsWith("image")) {
                    setFile(event.dataTransfer.files[0]);
                    setMessage(event.dataTransfer.files[0].name);
                  } else {
                    setFile(null);
                    setMessage("Le fichier n'est pas une image");
                  }
                }}
              >
                <img
                  src={uploadFileImg}
                  className="upload-file-img"
                  alt="Upload file icon"
                />
                <p>
                  Glisser-déposer le fichier ici ou{" "}
                  <button
                    className="upload-file-button-add-file"
                    type="button"
                    onClick={() => {
                      const fileInput = document.getElementById("fileInput");
                      if (fileInput) fileInput.click();
                    }}
                  >
                    choisir le fichier
                  </button>
                </p>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    if (event.target.files?.[0]?.type.startsWith("image")) {
                      setFile(event.target.files[0]);
                      setMessage(event.target.files[0].name);
                    } else {
                      setFile(null);
                      setMessage("Le fichier n'est pas une image");
                    }
                  }}
                />
              </div>
            </DndContext>
            <p>{message}</p>
          </div>
          <button className="sell-button-submit" type="submit">
            Mettre en ligne
          </button>
        </form>
      </section>
    </>
  );
}
