import React, { useState } from 'react';
import styled from 'styled-components';
import cnt from './data'; // 데이터 파일 경로를 적절하게 지정

const Title = styled.div `
    
`;

export default function SelectAddress () {
    const [selectedCityIndex, setSelectedCityIndex] = useState(0);
    const [selectedCountyOptions, setSelectedCountyOptions] = useState(cnt[0]);

    // 시/도 선택 시 호출되는 이벤트 핸들러
    const handleCityChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedCityIndex(selectedIndex); // 선택된 시/도 인덱스 업데이트
        setSelectedCountyOptions(cnt[selectedIndex]); // 선택된 시/도에 해당하는 구/군 목록 업데이트
    };

    return (
        <div>
            <Title>시/도:</Title>
            <select
                name="city"
                onChange={this.handleCityChange}
                className="input"
                value={selectedCityIndex}>
                {cnt.map((city, index) => (
                <option key={index} value={index}>
                    {city[0]}
                </option>
                ))}
            </select>
            
            <Title>구/군:</Title>
            <select name="county" className="select">
                {selectedCountyOptions.map((county, index) => (
                <option key={index} value={county}>
                    {county}
                </option>
                ))}
            </select>
        </div>
    );
}