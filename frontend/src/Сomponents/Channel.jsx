import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

const Channel = (props) => {
  const { t } = useTranslation();
  const {
    channel, activeChannel, handleChannel, handleShowDelete, handleShowRename,
  } = props;

  const { id, name, removable } = channel;

  const renderDropdown = () => (
    <>
      <Dropdown.Toggle
        split
        id="Управление каналом"
        className="btn-secondary btn-light"
        data-text="Управление каналом"
      >
        <div className="visually-hidden">Управление каналом</div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleShowDelete} data-channelid={id}>
          {t('chat.delete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleShowRename} data-channelid={id}>
          {t('chat.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );

  return (
    <li className="nav-item" key={id}>
      <Dropdown as={ButtonGroup} key={id} className="w-100">
        <Button
          className={cn('w-100 rounded-0 text-start btn text-start text-truncate', {
            'btn-secondary': Number(id) === Number(activeChannel),
            'btn-light': Number(id) !== Number(activeChannel),
          })}
          onClick={handleChannel}
          data-channelid={id}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
        {removable && renderDropdown()}
      </Dropdown>
    </li>
  );
};

export default Channel;
