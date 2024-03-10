import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CampNavbar from '../CampNavbar';
import '../CampBoard/css/campSearch.css';

function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  // 날짜
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);

  // 다음 날짜 계산
  const nextDay = new Date(now);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayOfMonth = ('0' + nextDay.getDate()).slice(-2);
  const Month = ('0' + (nextDay.getMonth() + 1)).slice(-2);
  const nextYear = nextDay.getFullYear();

  const [searchCamp, setSearchCamp] = useState({
    CAMP_ID: '0',
    CAMP_SELECT: '전체',
    CAMP_LOCATION: '전체',
    CAMP_ADULT: '1',
    CAMP_CHILD: '1',
    CAMP_CHECKIN: year + '-' + month + '-' + day,
    CAMP_CHECKOUT: nextYear + '-' + Month + '-' + nextDayOfMonth,
  });

  const campSearch = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/camp/search/campList',
        searchCamp
      );

      setSearchResults(response.data);

    } catch (error) {
      console.error('Error during search:', error.message);
    }
  };

  const handleRowClick = (CAMP_ID) => {
    navigate(`/camp/board/get/${CAMP_ID}`, {
      state: {
        CAMP_SELECT: `${searchCamp.CAMP_SELECT}`,
        CAMP_ADULT: `${searchCamp.CAMP_ADULT}`,
        CAMP_CHILD: `${searchCamp.CAMP_CHILD}`,
        CAMP_CHECKIN: `${searchCamp.CAMP_CHECKIN}`,
        CAMP_CHECKOUT: `${searchCamp.CAMP_CHECKOUT}`,
      },
    });
  };
  useEffect(() => {
    campSearch();
  }, [searchCamp]);

  return (
    <section>
      <CampNavbar />
      <Container fluid className='home-section' id='home'>
        <Container className='home-content'></Container>
      </Container>

      <Container className='mt-5'>
        <Row className='justify-content-center mt-4'>
          <div id='firstsearchContainer'>
            <Col md={6} id='searchContainer'>
              <h3 id='campingSearchTitle' className='text-center mb-4'>
                캠핑장 검색
              </h3>
              <Form>
                <div id='campingTypeBox'>
                  <Form.Group controlId='campingType' className='mb-3'>
                    <Form.Label>캠핑 유형</Form.Label>
                    <Form.Control
                      id='input1'
                      as='select'
                      value={searchCamp.CAMP_SELECT}
                      onChange={(e) => {
                        setSearchCamp({
                          ...searchCamp,
                          CAMP_SELECT: e.target.value, 
                        } );
                       
                      }}
                    >
                      <option value='전체'>전체</option>
                      <option value='글램핑'>글램핑</option>
                      <option value='펜션'>펜션</option>
                      <option value='텐트'>텐트</option>
                      <option value='카라반'>카라반</option>
                      <option value='야영장'>야영장</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='campingType' className='mb-3'>
                    <Form.Label>지역</Form.Label>
                    <Form.Control
                      id='input2'
                      as='select'
                      value={searchCamp.CAMP_LOCATION}
                      onChange={(e) => {
                        setSearchCamp({
                          ...searchCamp,
                          CAMP_LOCATION: e.target.value,
                        });
                      }}
                    >
                      <option value='전체'>전체</option>
                      <option value='서울'>서울</option>
                      <option value='경기'>경기</option>
                      <option value='인천'>인천</option>
                      <option value='강원'>강원</option>
                      <option value='춘천'>춘천</option>
                      <option value='대전'>대전</option>
                      <option value='충청'>충청</option>
                      <option value='전라'>전라</option>
                      <option value='경상'>경상</option>
                      <option value='부산'>부산</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='campingPeople' className='mb-3'>
                    <Form.Label>성인</Form.Label>
                    <Form.Control
                      id='input3'
                      min={1}
                      max={10}
                      type='number'
                      value={searchCamp.CAMP_ADULT}
                      onChange={(e) => {
                        setSearchCamp({
                          ...searchCamp,
                          CAMP_ADULT: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId='campingPeople' className='mb-3'>
                    <Form.Label>아이</Form.Label>
                    <Form.Control
                      min={1}
                      max={10}
                      id='input4'
                      type='number'
                      value={searchCamp.CAMP_CHILD}
                      onChange={(e) => {
                        setSearchCamp({
                          ...searchCamp,
                          CAMP_CHILD: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </div>
                <Form.Group controlId='campingDate' className='mb-3'>
                  <Form.Label>체크인 날짜</Form.Label>
                  <Form.Control
                    id='checkindateinput'
                    type='date'
                    value={searchCamp.CAMP_CHECKIN}
                    onChange={(e) => {
                      setSearchCamp({
                        ...searchCamp,
                        CAMP_CHECKIN: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='campingDate' className='mb-3'>
                  <Form.Label>체크아웃 날짜</Form.Label>
                  <Form.Control
                    id='checkoutdateinput'
                    type='date'
                    value={searchCamp.CAMP_CHECKOUT}
                    onChange={(e) => {
                      setSearchCamp({
                        ...searchCamp,
                        CAMP_CHECKOUT: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Form>
            </Col>
          </div>
        </Row>

        {searchResults.length > 0 && (
          <Row className='mt-3'>
            {searchResults.map((site) => (
              <Col
                key={site.CAMP_ID}
                md={3}
                className='mb-3'
                onClick={() => handleRowClick(site.CAMP_ID)}
              >
                <Card>
                  <Card.Body >
                  <Card.Img src={site.CAMP_IMAGES.split(";")} style={{ width: '270px', height: '250px' }} />
                    <Card.Title>{site.CAMP_SELECT}</Card.Title>
                    <Card.Text>{site.CAMP_NAME}</Card.Text>
                    <Card.Text>{site.CAMP_LOCATION}</Card.Text>
                    <Card.Text>{site.CAMP_PRICE}원</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {searchResults.length === 0 && (
          <Row id='campSearchFooterbox' className='mt-3 justify-content-center'>
            <Col md={6} className='text-center'>
              <p id='campSearchFooter' className='lead text-muted'>검색 결과가 없습니다.</p>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}

export default SearchPage;
