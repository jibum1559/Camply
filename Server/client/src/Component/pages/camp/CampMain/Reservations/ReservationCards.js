import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CgWebsite } from 'react-icons/cg';
import axios from 'axios';

function ReservationCard(props) {
  const [boardData, setBoardData] = useState({ camp_images: [] });

  useEffect(() => {
    const fetchCampData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/camp/board/get/${props.camp_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("yourTokenKey")}`,
          },
        });
        const camp_images = response.data.camp_images.split(";");
        setBoardData({ ...response.data, camp_images });
      } catch (error) {
        console.error("Error fetching camp data:", error);
      }
    };

    fetchCampData();
  }, [props.camp_id]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const mainImage = boardData.camp_images && boardData.camp_images.length > 0 ? (
    <div className="carousel-item active">
      <img
        src={boardData.camp_images[0]}
        className="d-block w-100"
        alt="camp-main-image"
        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
      />
    </div>
  ) : (
    <p>이미지가 없습니다.</p>
  );

  const handleReservationClick = () => {
    props.introduceLink(props.camp_id);
  };

  return (
    <Card className="project-card-view">
      <div className="carousel-inner">
        {mainImage}
      </div>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}>
          {props.description}
        </Card.Text>
        
        {props.address && (
          <p>
            <strong>주소:</strong> {props.address}
          </p>
        )}
        {props.price && (
          <p>
            <strong>가격:</strong> {numberWithCommas(props.price)}원
          </p>
        )}
        
        {!props.isBlog && props.reservationsLink && (
          <Button
            variant="warning"
            onClick={handleReservationClick}
            style={{ marginLeft: '10px' }}
          >
            <CgWebsite /> &nbsp;
            {'둘러보기'}
          </Button>
        )}
        
      </Card.Body>
      
    </Card>
  );
}

export default ReservationCard;
