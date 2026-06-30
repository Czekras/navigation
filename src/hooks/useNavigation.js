import { useState } from 'react';
import pkg from '../../package.json';
import settings from '../data/settings.json';

const STORAGE_KEYS = {
  list: 'navigationArrays',
  settings: 'navigationSettings',
  options: 'navigationOptions',
  version: 'navigationVersion',
};

function buildInitialList(initialList) {
  return initialList.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    initial: true,
  }));
}

function seedStorage() {
  localStorage.setItem(STORAGE_KEYS.list, JSON.stringify(buildInitialList(settings.initialList)));
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings.initialSetting));
  localStorage.setItem(STORAGE_KEYS.options, JSON.stringify(settings.initialOption));
  localStorage.setItem(STORAGE_KEYS.version, pkg.version);
}

function ensureStorage() {
  if (localStorage.getItem(STORAGE_KEYS.version) !== pkg.version) {
    seedStorage();
  }
}

export function useNavigation() {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [userList, setUserList] = useState(() => {
    ensureStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.list));
  });
  const [userSetting, setUserSetting] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.settings))
  );
  const [userOptions, setUserOptions] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.options))
  );

  const persistList = (list) => {
    localStorage.setItem(STORAGE_KEYS.list, JSON.stringify(list));
    setUserList(list);
  };

  const persistSetting = (setting) => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(setting));
    setUserSetting(setting);
  };

  const persistOptions = (options) => {
    localStorage.setItem(STORAGE_KEYS.options, JSON.stringify(options));
    setUserOptions(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: crypto.randomUUID(),
      slug,
      name,
      initial: false,
      skip: false,
    };
    persistList([...userList, newItem]);
    setSlug('');
    setName('');
  };

  const generateInitList = () => {
    persistList(buildInitialList(settings.initialList));
  };

  const handleDeleteItem = (index) => {
    persistList([...userList.slice(0, index), ...userList.slice(index + 1)]);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(userList);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    persistList(items);
  };

  const handleSettings = (e) => {
    const [section, operation] = e.target.id.split('_');
    const updated =
      operation === 'handle'
        ? { ...userSetting, [section]: { ...userSetting[section], toggle: e.target.checked } }
        : { ...userSetting, [section]: { ...userSetting[section], [operation]: e.target.value } };
    persistSetting(updated);
  };

  const handleResetName = (e, id) => {
    e.preventDefault();
    const section = id ? id.split('_')[0] : e.target.id.split('_')[0];
    persistSetting({
      ...userSetting,
      [section]: {
        ...settings.initialSetting[section],
        toggle: userSetting[section].toggle,
      },
    });
  };

  const handleOptions = (e) => {
    persistOptions({ ...userOptions, [e.target.id]: e.target.checked });
  };

  const handleOptionButton = (optionName) => {
    persistOptions({ ...userOptions, [optionName]: !userOptions[optionName] });
  };

  const handleInputOptions = (e) => {
    persistOptions({ ...userOptions, [e.target.id]: e.target.value });
  };

  const handleResetOptions = () => {
    persistOptions(settings.initialOption);
  };

  return {
    slug, setSlug,
    name, setName,
    userList,
    userSetting,
    userOptions,
    handleSubmit,
    generateInitList,
    handleDeleteItem,
    handleOnDragEnd,
    handleSettings,
    handleResetName,
    handleOptions,
    handleOptionButton,
    handleInputOptions,
    handleResetOptions,
  };
}
