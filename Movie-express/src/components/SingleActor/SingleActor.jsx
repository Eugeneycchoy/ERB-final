import { useEffect } from "react";
import "../SingleActor/SingleActor.css";

export default function SingleActor({
  person,
  baseImgPath,
  handleDisplayActorInfoModal,
}) {
  useEffect(() => {
    const actorImgElements = document.querySelectorAll(".actor-img");
    const actorNamePlates = document.querySelectorAll(".actor-name");

    actorImgElements.forEach((actorImgElement, index) => {
      const actorNamePlate = actorNamePlates[index];
      actorImgElement.addEventListener("mouseenter", () => {
        actorNamePlate.classList.remove("hide");
      });
      actorImgElement.addEventListener("mouseleave", () => {
        actorNamePlate.classList.add("hide");
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      actorImgElements.forEach((actorImgElement, index) => {
        const actorNamePlate = actorNamePlates[index];
        actorImgElement.removeEventListener("mouseenter", () => {
          actorNamePlate.classList.remove("hide");
        });
        actorImgElement.removeEventListener("mouseleave", () => {
          actorNamePlate.classList.add("hide");
        });
      });
    };
  }, []);

  return (
    <div
      className="actor-container"
      onClick={() => handleDisplayActorInfoModal(person)}
    >
      <img
        className="actor-img"
        src={baseImgPath + person.profile_path}
        alt=""
      />
      <div className="actor-name hide">{person.name}</div>
    </div>
  );
}
