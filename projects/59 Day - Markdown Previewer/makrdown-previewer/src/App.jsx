import React, {useState} from 'react'
import './App.css'
import Content from './components/Content'
import { createUseStyles } from 'react-jss'
import Markdown from 'marked-react'

import Editor from './components/Editor';

const useStyle = createUseStyles({
    app: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

function App() {

    const style = useStyle();

    const [markdown, setMarkdown] = useState('');

    const handleChange = (e) => {
        setMarkdown(e.target.value)
    }

    return (
        <div className={style.app}>
            <Content width="40vw" title='Editor'>
                <Editor handleChange={handleChange} />
            </Content>

            <Content width="80vw" title='Preview'>
                <Markdown value={markdown} />
            </Content>

        </div>
    )
}

export default App
