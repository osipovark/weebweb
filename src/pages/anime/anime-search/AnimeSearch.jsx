/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import * as Icons from "@heroicons/react/16/solid";

import AnimeItem from "../../../components/anime-item/AnimeItem.jsx";

import styles from "./AnimeSearch.module.css";

// const initialState = {};

function AnimeSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [animes, setAnimes] = useState([]);
  const [isAdvancedDisplayed, setIsAdvancedDisplayed] = useState(false);
  const maxPage = useRef(null);
  const queryInputValue = useRef(null);

  useEffect(() => {
    const fetchAnimes = async function (fetchQuery, signal) {
      let response = await fetch(fetchQuery, signal);
      if (response.status === 429) {
        do {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          response = await fetch(fetchQuery, signal);
        } while (response.status !== 200);
      }
      if (response.status === 200) {
        const json = await response.json();
        maxPage.current = json.pagination.last_visible_page;
        setAnimes(json.data);
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;

    const base = `https://api.jikan.moe/v4/anime?`;

    console.log(searchParams.toString());

    fetchAnimes(base + searchParams.toString(), signal);

    return () => {
      controller.abort();
    };
  }, [searchParams]);

  const handleSearchButtonClick = function () {
    if (queryInputValue.current.value === "") {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.delete("q");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("q", queryInputValue.current.value);
        return prev;
      });
    }
  };

  const handlePrevPageClick = function () {
    if (!searchParams.get("page") || +searchParams.get("page") === 1) return;
    setSearchParams((prev) => {
      if (+prev.get("page") === 2) {
        prev.delete("page");
      } else {
        prev.set("page", +prev.get("page") - 1);
      }
      return prev;
    });
  };

  const handleNextPageClick = function () {
    if (
      (searchParams.get("page") === undefined ||
        searchParams.get("page") === null) &&
      maxPage.current === 1
    )
      return;
    if (+searchParams.get("page") === maxPage.current) return;
    setSearchParams((prev) => {
      prev.set(
        "page",
        !searchParams.get("page") ? 2 : +searchParams.get("page") + 1
      );
      return prev;
    });
  };

  /*
  const toggleSFW = function () {
    if (searchParams.has("sfw")) {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.delete("sfw");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("sfw", "");
        return prev;
      });
    }
  };
  */

  /*
  const toggleApproved = function () {
    if (searchParams.has("approved")) {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.delete("approved");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("approved", "");
        return prev;
      });
    }
  };
  */

  const changeType = function (typeValue) {
    if (typeValue) {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("type", typeValue);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.delete("type");
        return prev;
      });
    }
  };

  const changeRating = function (ratingValue) {
    if (ratingValue) {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("rating", ratingValue);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.delete("rating");
        return prev;
      });
    }
  };

  return (
    <main className="container--1200">
      <search className={styles.animeSearch}>
        <div className={styles.searchBar}>
          <input
            type="search"
            className={styles.queryInput}
            placeholder="Search anime..."
            ref={queryInputValue}
          />
          <button
            type="button"
            className={styles.searchBtn}
            onClick={() => setIsAdvancedDisplayed(!isAdvancedDisplayed)}
          >
            <Icons.AdjustmentsHorizontalIcon />
          </button>
          <button
            type="button"
            className={styles.searchBtn}
            onClick={handleSearchButtonClick}
          >
            <Icons.MagnifyingGlassIcon />
          </button>
        </div>
        <form
          className={`${styles.advancedSearchForm} ${
            isAdvancedDisplayed ? "displayed" : ""
          }`}
        >
          {/*
          <div className={styles.searchField}>
            <label className={styles.searchLabel} htmlFor="sfw-flag">
              SFW
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="sfw-flag"
              checked={searchParams.has("sfw")}
              onChange={toggleSFW}
            />
          </div>
          */}
          {/*
          <div className={styles.searchField}>
            <label className={styles.searchLabel} htmlFor="approved-flag">
              approved
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="approved-flag"
              checked={searchParams.has("approved")}
              onChange={toggleApproved}
            />
          </div>
          */}
          <div className={styles.searchField}>
            <label className={styles.searchLabel}>type</label>
            <select
              className={styles.select}
              name="type"
              value={searchParams.get("type") ?? ""}
              onChange={(e) => changeType(e.target.value)}
            >
              <option value="">--Choose Type--</option>
              <option value="tv">tv</option>
              <option value="movie">movie</option>
              <option value="ova">ova</option>
              <option value="special">special</option>
              <option value="ona">ona</option>
              <option value="music">music</option>
              <option value="cm">cm</option>
              <option value="pv">pv</option>
              <option value="tv-special">tv special</option>
            </select>
          </div>
          <div className={styles.searchField}>
            <label className={styles.searchLabel}>rating</label>
            <select
              className={styles.select}
              name="rating"
              value={searchParams.get("rating") ?? ""}
              onChange={(e) => changeRating(e.target.value)}
            >
              <option value="">--Choose Rating--</option>
              <option value="g">G - All Ages</option>
              <option value="pg">PG - Children</option>
              <option value="pg13">PG-13 - Teens 13 or older</option>
              <option value="r17">R-17+ (violence & profanity)</option>
              <option value="r">R+ - Mild Nudity</option>
              <option value="rx">Rx - Hentai</option>
            </select>
          </div>
        </form>
      </search>
      <section className={styles.searchResults}>
        <ul className={styles.animeItemsList}>
          {animes.map((anime) => (
            <AnimeItem key={anime.mal_id} anime={anime} />
          ))}
        </ul>

        <div className={styles.pageBtnBox}>
          <button
            className={styles.btnChangePage}
            onClick={handlePrevPageClick}
          >
            <Icons.ChevronLeftIcon />
          </button>
          <p className={styles.currentPageNum}>
            {searchParams.get("page") ?? 1}
          </p>
          <button
            className={styles.btnChangePage}
            onClick={handleNextPageClick}
          >
            <Icons.ChevronRightIcon />
          </button>
        </div>
      </section>
    </main>
  );
}

export default AnimeSearch;
