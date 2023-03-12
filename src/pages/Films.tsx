import { useEffect, useState, useContext, ChangeEvent, useMemo } from 'react'
import { Card, Input } from 'antd';
import { FilmType } from '../types/film'
import axios from 'axios';
import {API_NEW, API, API_OMDb } from '../api'
import { FilmContextType } from '../types/FilmContextType';
import { FilmContext } from '../сontext/FilmContext';
import { usePageContext } from '../сontext/PageContex';
import { useNavigate } from "react-router-dom"
import useDebouncedFunction from '../helpers/debounce';
import ErrorPage from './ErrorPage';


const Films = () => {
  const navigate = useNavigate();

  const { setSelectedItem } = useContext<FilmContextType>(FilmContext);
  const { setSelectedInputValue, selectedInputValue } = usePageContext();

  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<FilmType>();
  const [loading, setLoading] = useState<boolean>(false);


  const getData = async (inputValue: string) => {
    const apiUrl = inputValue ? `${API_NEW}${inputValue}${API}` : API_OMDb;
    setLoading(true);
    const response = await axios.get(apiUrl);
    if (inputValue) {
      setData(response.data);
    } else {
      setData(response.data);
    }
    setLoading(false);
  }


  const onDebounce = useDebouncedFunction(getData, 500);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onDebounce(value)
    setInputValue(value);
  }

  const onSelect = (event: any) => {
    const name = event.target.dataset.name;
    setSelectedItem(name);
    setSelectedInputValue(inputValue);
    navigate(`/${name}`);
  }



  useEffect(() => {
    setInputValue(selectedInputValue);
    getData(selectedInputValue);
  }, [])

  if (!data) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className="container" >
      <Input placeholder='Enter Show' className='input' value={inputValue} onChange={onChange} />
      <Card
        className='card'
        loading={loading}
        onClick={onSelect}
        data-name={data.Title}
        key={data.imdbID}
        style={{ width: 270 }}
        cover={<img src={data.Poster} className="image" data-name={data.Title} />}>
        <div className='info'>
          <p data-name={data.Title}>Title: {data.Title}</p>
          <p data-name={data.Title}>Year: {data.Year}</p>
        </div>
      </Card>
    </div>
  )
}
export default Films










