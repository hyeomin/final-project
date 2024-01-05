import {
    MainSubWrapper,
    Button,
    ButtonWrapper,
    SortWrapper,
    ContentsWrapper,
    Contents,
    Content,
    MoreContentWrapper,
} from './style';
import defaultImg from '../../assets/defaultImg.jpg';

function MainSub() {
    return (
        <MainSubWrapper>
            <ButtonWrapper>
                <Button>관리자 게시물</Button>
                <Button>인기 게시물</Button>
                <Button>환경보호 제품추천</Button>
                <Button>제품 나눔</Button>
            </ButtonWrapper>

            <SortWrapper>
                <li>
                    <a href="#none">인기순</a>
                </li>

                <li>
                    <a href="#none">최신순</a>
                </li>
            </SortWrapper>

            <ContentsWrapper>
                <Contents>
                    <Content>
                        <img src={defaultImg}></img>
                        <p>text text text text</p>
                        <p>text text text text</p>
                    </Content>

                    <Content>
                        <img src={defaultImg}></img>
                        <p>text text text text</p>
                        <p>text text text text</p>
                    </Content>

                    <Content>
                        <img src={defaultImg}></img>
                        <p>text text text text</p>
                        <p>text text text text</p>
                    </Content>

                    <Content>
                        <img src={defaultImg}></img>
                        <p>text text text text</p>
                        <p>text text text text</p>
                    </Content>

                    <Content>
                        <img src={defaultImg}></img>
                        <p>text text text text</p>
                        <p>text text text text</p>
                    </Content>

                    <Content>
                        <img src={defaultImg}></img>
                        <p>text text text text</p>
                        <p>text text text text</p>
                    </Content>
                </Contents>
            </ContentsWrapper>

            <MoreContentWrapper>
                <button>더보기...</button>
            </MoreContentWrapper>
        </MainSubWrapper>
    );
}
export default MainSub;
