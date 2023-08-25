import React from 'react';
import styled from 'styled-components'


const Paging = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageNumber = styled.div`
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    ${({ isActive }) =>
        isActive &&
        `
        background-color: #84A080;
        color: white;
        `
    }
`;
const LeftIcon = styled.div`
    cursor: pointer;
    margin-right: 10px;
    display: ${({ $displayLeftIcon }) => ($displayLeftIcon ? 'block' : 'none')};
`;

const RightIcon = styled.div`
    cursor: pointer;
    margin-left: 10px;
    display: ${({ $displayRightIcon }) => ($displayRightIcon ? 'block' : 'none')};
`;

export default function PagingContent({ currentPage, totalPage, onPageChange }) {
    const renderPageNumbers = () => {

        const pageNumbers = [];
        const maxDisplayedPages = 9;
        let startPage = 1;
    
        if (totalPage > maxDisplayedPages) {
            if (currentPage > Math.floor(maxDisplayedPages / 2)) {
                startPage = currentPage - Math.floor(maxDisplayedPages / 2);
                if (startPage + maxDisplayedPages > totalPage) {
                    startPage = totalPage - maxDisplayedPages + 1;
                }
            }
        }
    
        const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPage);
    
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
            <PageNumber
                key={i}
                isActive={i === currentPage}
                onClick={() => onPageChange(i)}
            >
                {i}
            </PageNumber>
            );
        }
    
        return pageNumbers;
    };

    return (
        <Paging>
            <LeftIcon $displayLeftIcon={currentPage > 10} onClick={() => onPageChange(currentPage - 1)}>
                Left
            </LeftIcon>
            {renderPageNumbers()}
            <RightIcon $displayRightIcon={currentPage >= 10} onClick={() => onPageChange(currentPage + 1)}>Right</RightIcon>
        </Paging>
    );
}