import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GetSurah } from "./api";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SurahDetail } from "./api";
function App() {
  const [surah, setSurah] = useState([]);
  const [allSurahs, setAllSurahs] = useState([]);

  useEffect(() => {
    GetSurah().then((res) => {
      setSurah(res);
      setAllSurahs(res);
    });
  }, []);

  const search = (target) => {
    const query = target.toLowerCase();
    const filteredSurahs = allSurahs.filter(
      (sur) =>
        sur.englishName.toLowerCase().includes(query) ||
        sur.number.toString() === query
    );
    setSurah(filteredSurahs);
  };

  const SurahAll = () => {
    return surah.map((sur) => (
      <Link to={`/surah/${sur.number}`} key={sur.number} className="link">
        <div className="card border-dark shadow">
          <div className="nm-surah">{sur.name}</div>
          <div className="english">{sur.englishName}</div>
          <div className="urutanSurah">Surah ke : {sur.number}</div>
          <div>Jumlah Ayat : {sur.numberOfAyahs}</div>
        </div>
      </Link>
    ));
  };

  return (
    <Router>
      <Navbar expand="lg" className="bg-dark">
        <Container fluid>
          <Navbar.Brand href="#" className="text-light">
            Al-Quran Online
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => search(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="containers">
        <Routes>
          <Route path="/" element={<SurahAll />} />
          <Route path="/surah/:number" element={<SurahDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
