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

    const freeCodeCampTemplate = 
    `# Welcome to my React Markdown Previewer!

    ## This is a sub-heading...
    ### And here's some other cool stuff:
    
    Heres some code, \`<div></div>\`, between 2 backticks.
    
    \`\`\`
    // this is multi-line code:
    
    function anotherExample(firstLine, lastLine) {
      if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
      }
    }
    \`\`\`
    
    You can also make text **bold**... whoa!
    Or _italic_.
    Or... wait for it... **_both!_**
    And feel free to go crazy ~~crossing stuff out~~.
    
    There's also [links](https://www.freecodecamp.org), and
    > Block Quotes!
    
    And if you want to get really crazy, even tables:
    
    Wild Header | Crazy Header | Another Header?
    ------------ | ------------- | -------------
    Your content can | be here, and it | can be here....
    And here. | Okay. | I think we get it.
    
    - And of course there are lists.
      - Some are bulleted.
         - With different indentation levels.
            - That look like this.
    
    
    1. And there are numbered lists too.
    1. Use just 1s if you want!
    1. And last but not least, let's not forget embedded images:
    
    ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`

    const style = useStyle();

    const [markdown, setMarkdown] = useState(freeCodeCampTemplate);
    const [expanded, setExpanded] = useState({ title: null });

    const handleChange = (e) => {
        setMarkdown(e.target.value)
    }

    const handleExpand = (title) => {
        if(expanded.title === title) {
            setExpanded({ title: null });
        }
        else{
            setExpanded({ title });
        }

    }

    return (
        <div className={style.app}>
            <Content width="40vw" title='Editor' onExpand={handleExpand} expandedWindow={expanded}>
                <Editor handleChange={handleChange} initialValue={markdown} />
            </Content>

            <Content width="80vw" title='Preview' onExpand={handleExpand} expandedWindow={expanded}>
                <Markdown value={markdown} />
            </Content>

        </div>
    )
}

export default App
