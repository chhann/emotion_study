/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useSearchParams } from "react-router-dom";
import { useLoadList, useLoadListByPageNumber } from "../../hooks/boardListHook";

const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
`;

const headerTitle = css`
    margin-bottom: 30px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
`

const boardListLayout = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    width: 900px;
    height: 500px;
`

const boardListHead = css`
    box-sizing: border-box;
    display: flex;
    border-bottom: 2px solid #dbdbdb;
    width: 100%;
    & > div  {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 0px solid #dbdbdb;
        flex-grow: 1;
        height: 40px;
        font-weight: 700;
        cursor: default;
    }
    & > div:nth-of-type(1) {
        flex-grow: 0;
        border-right: 1px solid #dbdbdb;
        width: 80px;
    }
`;

const boardListItem = css`
    color: #222;
    text-decoration: none;
    cursor: pointer;
    & > li {
        box-sizing: border-box;
        border-bottom: 1px solid #dbdbdb;
        display: flex;
        width: 100%;
        &:hover {
            background-color: #eee;
        }
        & > div  {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 0px solid #dbdbdb;
        flex-grow: 1;
        height: 40px;
        }
        & > div:nth-of-type(1) {
            flex-grow: 0;
            border-right: 1px solid #dbdbdb;
            width: 80px;
        }
    }
`;

const pageNumberLayout = (page) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    & > a {
        box-sizing: border-box;
        margin: 0px 3px;
        border: 1px solid #dbdbdb;
        padding: 3px;
        text-decoration: none;
        color: #222;
        font-weight: 700;
        &:nth-of-type(${page === 1 ? 1 : page % 5 === 0 ? 8 : (page % 5) + 3}) {
            background-color: #eee;
        }
    }

`


function BoardList(props) {
    const [ searchParams ] = useSearchParams();
    const page = parseInt(searchParams.get("page"));

    const { boardList, pageNumbers, totalPageCount, endPageNumber, startPageNumber } = useLoadListByPageNumber(page);

    

    return (
        <div css={layout}>
            <h1 css={headerTitle}>게시글 목록</h1>
            <ul css={boardListLayout}>
                <li css={boardListHead}>
                    <div>번호</div>
                    <div>제목</div>
                </li>
                {boardList.map(board => 
                    <Link to={`/board/${board.boardId}`} css={boardListItem}>
                        <li>
                            <div>{board.boardId}</div>
                            <div>{board.boardTitle}</div>
                        </li>
                    </Link>
                )}
            </ul>
            <div css={pageNumberLayout(page)}>
                {/*
                startPageNumber ! == 1 ? startpageNumber - 5 : 1
                startPageNumber + 5 
                page < 6 ? 1 : page % 10 !== 0 ? 5 >= (page % 10) ? (Math.floor(page / 10) * 10) - 4 : (Math.floor(page / 10) * 10) + 1 : page - 5}`
                page >= endPageNumber ? page < 6 ? 10 : page % 10 !== 0 ? 5 >= (page % 10) ? (Math.floor(page / 10) * 10)  : (Math.floor(page / 10) * 10) + 15 : page + 5 : endPageNumber 
                */}
                {page !== 1 && <Link to={`/board/list?page=${1}`}>처음으로</Link>}
                {page !== 1 && <Link to={`/board/list?page=${startPageNumber !== 1 ? startPageNumber - 5 : 1}`}>&#171;</Link>}
                {page !== 1 && <Link to={`/board/list?page=${page - 1}`}>&#60;</Link>}
                {pageNumbers.map(pageNumber => 
                    <Link to={`/board/list?page=${pageNumber}`}>{pageNumber}</Link>
                )}
                {page !== totalPageCount && <Link to={`/board/list?page=${page + 1}`}>&#62;</Link>}
                {page !== totalPageCount && <Link to={`/board/list?page=${startPageNumber + 5 }`}>&#187;</Link>}
                {page !== totalPageCount && <Link to={`/board/list?page=${totalPageCount}`}>마지막으로</Link>}
            </div>
        </div>
    );
}

export default BoardList;