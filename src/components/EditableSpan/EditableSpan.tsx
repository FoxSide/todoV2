import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  console.log('EditableSpan called');
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ?
    <div style={{width: '180px'}}>
      <TextField size='small' value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
    </div>
    : <span style={{width: '180px'}} onDoubleClick={activateEditMode}>{props.value}</span>
});
