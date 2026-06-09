import { useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

type ModalCropFotoProps = {
  aberto: boolean;
  preview: string;
  onClose: () => void;
  onConfirm: (imagemRecortada: string) => void;
};

export function ModalCropFoto({
  aberto,
  preview,
  onClose,
  onConfirm,
}: ModalCropFotoProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaRecortada, setAreaRecortada] = useState<Area | null>(null);

  if (!aberto) return null;

  async function confirmarCorte() {
    if (!areaRecortada) return;

    const imagem = await criarImagem(preview);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = areaRecortada.width;
    canvas.height = areaRecortada.height;

    ctx.drawImage(
      imagem,
      areaRecortada.x,
      areaRecortada.y,
      areaRecortada.width,
      areaRecortada.height,
      0,
      0,
      areaRecortada.width,
      areaRecortada.height
    );

    const imagemCortada = canvas.toDataURL("image/jpeg");

    onConfirm(imagemCortada);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="mb-4 text-lg font-semibold text-zinc-800">
          Enquadrar foto
        </h3>

        <div className="relative h-80 w-full overflow-hidden rounded-xl bg-black">
          <Cropper
            image={preview}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedAreaPixels) =>
              setAreaRecortada(croppedAreaPixels)
            }
          />
        </div>

        <div className="mt-4">
          <label className="text-sm text-zinc-600">Zoom</label>

          <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"/>
        </div>

        <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={confirmarCorte}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-white transition hover:opacity-90">
            Confirmar
          </button>

          <button type="button" onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function criarImagem(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const imagem = new Image();
    imagem.addEventListener("load", () => resolve(imagem));
    imagem.addEventListener("error", reject);
    imagem.src = url;
  });
}