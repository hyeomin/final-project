import styled from 'styled-components';
import theme from 'styles/theme';

// Editor
const WritingArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  & input {
    font-size: 18px;
    padding: 15px 10px;
    border-radius: 10px;
    border: 1px solid ${theme.color.lightgray};
    background: #f3f3f3;
  }
`;

const EditorContainer = styled.div`
  .ql-editor {
    font-size: 18px;

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }
  }
`;

// SelectCategory
const Select = styled.select`
  width: 200px;
  height: 30px;
  font-size: 16px;
  border-color: transparent;
  text-align: center;
  background-color: transparent;
`;

export default { WritingArea, EditorContainer, Select };
