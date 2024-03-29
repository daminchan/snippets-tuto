"useClient"
import React, { useState } from 'react';
import { VStack, Input, IconButton, Button } from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';

const DynamicForms = () => {
  const [forms, setForms] = useState([{ id: 1, value: '' }]);

  const addForm = () => {
    const newForm = { id: forms.length + 1, value: '' };
    setForms([...forms, newForm]);
  };

  const removeForm = (id:number) => {
    setForms(forms.filter(form => form.id !== id));
  };

  return (
    <VStack spacing={4}>
      {forms.map((form, index) => (
        <VStack key={form.id} spacing={1} align="stretch">
          <Input
            value={form.value}
            onChange={(e) => {
              const newForms = [...forms];
              newForms[index].value = e.target.value;
              setForms(newForms);
            }}
          />
          <IconButton
            aria-label="削除"
            icon={<DeleteIcon />}
            onClick={() => removeForm(form.id)}
          />
        </VStack>
      ))}
      <Button leftIcon={<AddIcon />} onClick={addForm}>
        追加
      </Button>
    </VStack>
  );
};

export default DynamicForms;