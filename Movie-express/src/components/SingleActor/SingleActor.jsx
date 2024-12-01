import "../SingleActor/SingleActor.css";

export default function SingleActor({ person, baseImgPath }) {
  return (
    <>
      <img src={baseImgPath + person.profile_path} alt="" />
    </>
  );
}
