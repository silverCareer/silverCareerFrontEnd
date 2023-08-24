import React, { useState } from 'react';
import styled from 'styled-components';
import { cities, counties } from './data'; // 데이터 파일 경로를 적절하게 지정

const AddressInput = styled.div `
    display: flex;
    gap: 10px;
    justify-content: space-between;

    select {
        width: 150px;
        margin-right: 50px;
        height: 20px;
    }
`;
const Title = styled.div`
    
`;
export default function SelectAddress({ setSelectedAddress }) {
    const [selectedCityIndex, setSelectedCityIndex] = useState(0);
    const [selectedCountyIndex, setSelectedCountyIndex] = useState(0);
    const [selectedCountyOptions, setSelectedCountyOptions] = useState(['전체']);

    // 시/도 선택 시 호출되는 이벤트 핸들러
    const handleCityChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedCityIndex(selectedIndex); // 선택된 시/도 인덱스 업데이트
        setSelectedCountyOptions(counties[selectedIndex]); // 선택된 시/도에 해당하는 구/군 목록 업데이트
    };

    const handleCountryChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedCountyIndex(selectedIndex);

        // 선택된 시/도와 구/군을 합쳐 address 변수를 생성
        const address = cities[selectedCityIndex] + ' ' + counties[selectedCityIndex][selectedIndex];
        
        console.log(address);
        setSelectedAddress(address);

    }

    return (
        <AddressInput>
            <Title>시/도:</Title>
            <select
                name="city"
                onChange={handleCityChange}
                className="input"
                value={selectedCityIndex}
            >
            {cities.map((city, index) => (
                <option key={index} value={index}>
                    {city}
                </option>
            ))}
            </select>
            
            <Title>구/군:</Title>
            <select
                name="county"
                onChange={handleCountryChange}
                className="select"
                value={selectedCountyIndex}
            >
            {counties[selectedCityIndex].map((county, index) => (
                <option key={index} value={index}>
                    {county}
                </option>
            ))}
            </select>
        </AddressInput>
    );
}