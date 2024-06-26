import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setAPiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: "",
    });

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmU0NzQzYjhkODAyNzQwYTUyZGM1MDFkZDdlYTNkNCIsInN1YiI6IjY2MzY1NDZlNjY1NjVhMDEyODE1NGE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k0ivlWbGAEnqOMT6EvuTkjeFzLSsPaDP2k6C-oN8XHk",
        },
    };

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options
        )
            .then((response) => response.json())
            .then((response) => setAPiData(response.results[0]))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="player">
            <img
                src={back_arrow_icon}
                alt=""
                onClick={() => {
                    navigate(-2);
                }}
            />
            8
            <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title="trailer"
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    );
};

export default Player;
