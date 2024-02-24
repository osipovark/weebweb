import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as Icons from "@heroicons/react/24/outline";

import styles from "./AnimeInfo.module.css";

function AnimeInfo() {
  const [animeData, setAnimeData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAnime = async function (signal) {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/full`,
        signal
      );
      const json = await res.json();
      setAnimeData(json.data);
    };

    const controller = new AbortController();
    const signal = controller.signal;

    fetchAnime(signal);

    return () => {
      controller.abort();
    };
  }, [id]);

  console.log(animeData);

  return (
    animeData && (
      <main className={`${styles.anime} container--1200`}>
        <header className={styles.header}>
          <img
            className={styles.poster}
            src={animeData.images.jpg.large_image_url}
            alt={`poster of the ${animeData.title} anime`}
          />
          <div className={styles.basic}>
            <h3 className={styles.title}>
              <span>{animeData.title}</span>
              {animeData.approved && <Icons.CheckBadgeIcon />}
            </h3>
            <ul className={styles.achievementList}>
              <li className={`${styles.achievement} ${styles.score}`}>
                <span>Score:</span>
                <b>
                  <span>{animeData.score}</span>
                  <Icons.StarIcon />
                </b>
              </li>
              <li className={`${styles.achievement} ${styles.rank}`}>
                <span>Rank:</span>
                <b>
                  <span>{animeData.rank}</span>
                  <Icons.TrophyIcon />
                </b>
              </li>
              <li className={`${styles.achievement} ${styles.popularity}`}>
                <span>Popularity:</span>
                <b>
                  <span>{animeData.popularity}</span>
                  <Icons.EyeIcon />
                </b>
              </li>
              <li className={`${styles.achievement} ${styles.members}`}>
                <span>Members:</span>
                <b>
                  <span>{animeData.members}</span>
                  <Icons.UserIcon />
                </b>
              </li>
              <li className={`${styles.achievement} ${styles.favorites}`}>
                <span>Favorites:</span>
                <b>
                  <span>{animeData.favorites}</span>
                  <Icons.HeartIcon />
                </b>
              </li>
            </ul>
            <p className={styles.aired}>
              <span>Aired: </span>
              <b>{animeData.aired.string}</b>
            </p>
          </div>
        </header>
        <section></section>
      </main>
    )
  );
}

export default AnimeInfo;
