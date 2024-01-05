import { useState } from "react";
import styled from "styled-components";

function WriteBody() {
    const HASHTAG = "hashtag";
    const [hashtag, setHashtag] = useState("");

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === HASHTAG) {
            setHashtag(value);
        }
    };

    return (
        <Container>
            <WritingArea>Writing Area</WritingArea>
            <HashtagArea>
                <RecommendedTags>추천 해시태그</RecommendedTags>
                <HashtagInputContainer>
                    <input
                        name={HASHTAG}
                        value={hashtag}
                        onChange={onChangeHandler}
                        placeholder="해시태그를 추가하세요."
                    />
                </HashtagInputContainer>
                <SelectedTagList>선택된 해시태그</SelectedTagList>
            </HashtagArea>
        </Container>
    );
}

export default WriteBody;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 20px;
`;

const WritingArea = styled.div`
    background-color: pink;
`;

const HashtagArea = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    padding: 10px;
    background-color: pink;
`;

const RecommendedTags = styled.div`
    background-color: lightblue;
`;

const HashtagInputContainer = styled.div`
    & input {
        display: flex;
        width: 100%;
    }
`;

const SelectedTagList = styled.div`
    background-color: lightblue;
`;
