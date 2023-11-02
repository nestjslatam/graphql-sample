import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { styled } from '@mui/system';

import TagService from '../../../services/tagService';
import { CreateTagDto } from '../../../models/';
import { AppGlobalContext } from '../../../context';

const Container = styled('div')(`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.25rem;
`);

const CrudCommands = () => {
  const context = React.useContext(AppGlobalContext);

  const createTag = async () => {
    await TagService.create(new CreateTagDto('demokey', 'demoname'));
  };

  const disableTag = async () => {
    await TagService.disable(context.data.id);
  };

  const enableTag = async () => {
    await TagService.enable(context.data.id);
  };

  return (
    <Container>
      <ButtonGroup size="small" aria-label="small button group">
        <Button onClick={createTag}>Create</Button>
        <Button onClick={disableTag}>Disable</Button>
        <Button onClick={enableTag}>Enable</Button>
      </ButtonGroup>
    </Container>
  );
};

export default CrudCommands;
