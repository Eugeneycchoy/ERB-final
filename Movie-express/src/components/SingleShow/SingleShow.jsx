import { useEffect, useState } from "react";
import "../SingleShow/SingleShow.css";
import cannotFindImg from "../../../public/cannot-find-movie-poster.jpg";

export default function SingleShow({
  show,
  baseUrl,
  imageType,
  handleDisplayShowInfoModal,
}) {
  return (
    <>
      <img
        className="single-show-img"
        key={show.id}
        src={
          imageType === "backdrop"
            ? (baseUrl + show.backdrop_path).includes("originalnull")
              ? cannotFindImg
              : baseUrl + show.backdrop_path
            : (baseUrl + show.poster_path).includes("originalnull")
            ? cannotFindImg
            : baseUrl + show.poster_path
        }
        alt=""
        onClick={() => handleDisplayShowInfoModal(show)}
      />
    </>
  );
}
