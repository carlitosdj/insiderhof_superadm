import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import { useDebounceEffect } from "./useDebounceEffect";
import FileResizer from "react-image-file-resizer";
import { canvasPreview } from "./canvasPreview";
import { Form } from "react-bootstrap";
import "react-image-crop/dist/ReactCrop.css";
import { getAppFileUrl } from "../../../utils/getApiUrl";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface Props {
  setSelectedFile: Dispatch<SetStateAction<any>>;
  selectedFile: any;

  setCroppedImage: Dispatch<SetStateAction<any>>;
  croppedImage: any;

  setImage: Dispatch<SetStateAction<any>>;
  image: any;
}

const SelectImg = ({
  setSelectedFile,
  selectedFile,
  setCroppedImage,
  croppedImage,
  setImage,
  image,
}: Props) => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(3 / 4); //16 / 9
  const [preview, setPreview] = useState<any>();

  const imgRef = useRef<HTMLImageElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    } else {
      setImgSrc("");
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        //console.log("hum?")
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        ).then(() => {
          previewCanvasRef.current?.toBlob((file: any) => {
            try {
              FileResizer.imageFileResizer(
                file,
                800,
                800,
                "JPEG",
                100,
                0,
                (uri) => {
                  //console.log("Nova imagem:", uri);
                  setCroppedImage(uri);
                },
                "blob"
              );
            } catch (error) {
              console.log("error", error);
            }
          }, "image/jpeg");
        });
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div className="">
      <div className={""}>
        <Form.Group>
          <Form.Label>Selecione uma imagem (9:16)</Form.Label>
          <Form.Control
            name="image"
            id="image"
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
          />
          <Form.Control.Feedback type="invalid">
            Selecione um arquivo
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <div>
          <label htmlFor="image">
            <a style={{ cursor: "pointer" }}>
              {!imgSrc && (
                <img
                  src={
                    image?.includes("https://")
                      ? image
                      : getAppFileUrl(image)
                  }
                  style={{ width: "50%" }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = getAppFileUrl("notfound.jpg");
                  }}
                />
              )}
              {selectedFile && <img src={preview} style={{ width: "50%" }} />}
            </a>
          </label>
        </div>

        <div className="row">
          <div className="col-6">
            {!!imgSrc && (
              <div>
                <div>Posicione a foto</div>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  maxHeight={350}
                  maxWidth={350}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                      //width:'100%'
                    }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>
            )}
          </div>
          <div className="col-6">
            <div>
              {!!completedCrop && !!imgSrc && (
                <div>
                  <div>Prévia</div>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: "1px solid black",
                      objectFit: "contain",
                      //width: completedCrop.width,
                      //height: completedCrop.height,
                      width: "100%",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectImg;
