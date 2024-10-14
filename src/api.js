import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// data berasal dari https://alquran.cloud/api. Sebuah free API

const AudioPlayer = ({ ayat }) => {
  return (
    <div>
      <audio controls>
        <source
          src={`https://cdn.islamic.network/quran/audio/64/ar.alafasy/${ayat}.mp3`}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export const GetSurah = async () => {
  const surah = await axios.get("http://api.alquran.cloud/v1/surah");

  // console.log({ surahs: surah.data });
  return surah.data.data;
};

export const SurahDetail = () => {
  const { number } = useParams();
  const [surahDetail, setSurahDetail] = useState(null);
  // console.log(number);
  // console.log(surahDetail);

  useEffect(() => {
    axios
      .get(`http://api.alquran.cloud/v1/surah/${number}`)
      .then((res) => {
        setSurahDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [number]);

  if (!surahDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="surah-detail" key={surahDetail.name}>
      <h3>{surahDetail.name}</h3>
      <h2>{surahDetail.englishName}</h2>
      <a href="/" className="tombol">
        Back
      </a>
      <p className="line">Surah ke: {surahDetail.number}</p>
      <p className="line">Jumlah Ayat: {surahDetail.numberOfAyahs}</p>
      {surahDetail.ayahs.map((ayah) => (
        <div>
          <p key={ayah.number} className="ayat">
            {ayah.numberInSurah}. {ayah.text}
          </p>
          <AudioPlayer ayat={ayah.number} />
        </div>
      ))}
      {/* <p>{surahDetail.edition.format}</p> */}
      {/* <p>{surahDetail.ayahs[0].text}</p> */}
    </div>
  );
};
