import { useEffect, useState, useContext } from 'react'
import { Card, Col, Row, Typography, Space } from 'antd';
import { FilmType } from '../types/film'
import axios from 'axios';
import { API_NEW, API } from '../api'
import { FilmContextType } from '../types/FilmContextType';
import { FilmContext } from '../сontext/FilmContext';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const SingleFilm = () => {
  const params = useParams();
  const [data, setData] = useState<FilmType | null>(null);
  const { selectedItem } = useContext<FilmContextType>(FilmContext);

  const getData = async (id: string | undefined) => {
    if (id) {
      const response = await axios.get(`${API_NEW}${id}${API}`);
      if (response.data) {
        setData({
          ...response.data,
        });
      }
    }
  }

  useEffect(() => {
    const id: string | undefined = selectedItem?.id ? selectedItem?.id?.toString() : params.id;
    getData(id);
  }, [selectedItem, params]);

  if (!data) {
    return null;
  }

  const { Text } = Typography;
  const { Writer, Poster, Actors,Awards,BoxOffice,Country,Director,Released,imdbRating
  } = data;

  return (
    <div className='wrap'>
      {<Link className='link' to='/'><LeftOutlined /></Link>}
      <Card  className='singlecard'>
        <Row justify='center' gutter={[16, 16]}>
          <Col flex='300px'>
            <img src={Poster} />
          </Col>
          <Col flex='auto' className="gutter-row">
            <Space direction="vertical" size="middle" >
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Actors:</Text>
                </Col>
                <Col>
                  <Text code>{Actors}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Writer:</Text>
                </Col>
                <Col>
                  <Text code>{Writer}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Awards:</Text>
                </Col>
                <Col>
                  <Text code>{Awards}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>BoxOffice:</Text>
                </Col>
                <Col>
                  <Text code>{BoxOffice}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Country:</Text>
                </Col>
                <Col>
                  <Text code>{Country}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Director:</Text>
                </Col>
                <Col>
                  <Text code>{Director}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Released:</Text>
                </Col>
                <Col>
                  <Text code>{Released}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>imdbRating:</Text>
                </Col>
                <Col>
                  <Text code>{imdbRating}</Text>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default SingleFilm;