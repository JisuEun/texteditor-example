import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const CommandPalette = ({ isVisible, onSelect, position }) => {
  const commands = ['글 요약', '인물 관계도', '이후 흐름 제안'];

  // position을 사용하여 선택창의 스타일을 동적으로 조정합니다.
  const style = {
    position: 'absolute',
    top: `${position.top}px`,
    left: `${position.left}px`,
    // 추가 스타일
  };

  return (
    <CSSTransition in={isVisible} timeout={300} classNames="command-palette" unmountOnExit>
      <ul style={style}>
        {commands.map((command) => (
          <li key={command} onClick={() => onSelect(command)}>
            {command}
          </li>
        ))}
      </ul>
    </CSSTransition>
  );
};

const TextEditor = () => {
  const [showPalette, setShowPalette] = useState(false);
  const [text, setText] = useState('');
  const [palettePosition, setPalettePosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);

  useEffect(() => {
    if (showPalette && editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect();
      setPalettePosition({
        top: rect.top + window.scrollY - 40, // 텍스트 에디터 위에 40px만큼 올립니다.
        left: rect.left + window.scrollX,
      });
    }
  }, [showPalette]);

  const handleTextChange = (e) => {
    const { value } = e.target;
    setText(value);

    if (value.endsWith('/')) {
      setShowPalette(true);
    } else {
      setShowPalette(false);
    }
  };

  const handleSelectCommand = (command) => {
    console.log(`Selected command: ${command}`);
    setShowPalette(false);
  };

  return (
    <div>
      <textarea ref={editorRef} onChange={handleTextChange} value={text} />
      <CommandPalette isVisible={showPalette} onSelect={handleSelectCommand} position={palettePosition} />
    </div>
  );
};

export default TextEditor;
