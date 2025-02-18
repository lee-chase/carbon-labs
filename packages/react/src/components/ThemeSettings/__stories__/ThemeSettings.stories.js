/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import mdx from './ThemeSettings.mdx';
import {
  ThemeMenuCompliment,
  ThemeSetDropdown,
  ThemeSettings,
  ThemeSwitcher,
} from '../components';
import '../components/theme-settings.scss';
import './storybook.scss';
import { Theme } from '@carbon/react';
import { useThemeSetting } from '../utils/use-theme-setting';

export default {
  title: 'ThemeSettings/ThemeSettings',
  component: ThemeSettings,
  subcomponents: { ThemeSwitcher, ThemeSetDropdown, ThemeMenuCompliment },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/**
 * createActionHandler - creates an action based on props
 *
 * @param {string} controlName - name of control
 * @param {string} eventName - name of event
 * @param {function} setter - setter function
 *
 * @returns {function}
 */
const createActionHandler = (controlName, eventName, setter) => {
  const localAction = action(`${controlName}.${eventName}`);
  return (value) => {
    localAction(value);
    setter(value);
  };
};

/**
 * Default story for ThemeSettings
 */
export const Default = () => {
  const [themeSetting, setThemeSetting] = useState(`system`);
  const handleThemeSetting = createActionHandler(
    'ThemeSwitcher',
    'onChange',
    setThemeSetting
  );

  return (
    <ThemeSettings>
      <ThemeSwitcher
        onChange={handleThemeSetting}
        value={themeSetting}></ThemeSwitcher>
    </ThemeSettings>
  );
};
Default.parameters = {
  layout: 'centered',
};

/**
 * WithMenuCompliment story for ThemeSettings
 */
export const WithMenuCompliment = () => {
  const [themeSetting, setThemeSetting] = useState(`system`);
  const [themeMenuCompliment, setThemeMenuCompliment] = useState(false);

  const handleThemeSetting = createActionHandler(
    'ThemeSwitcher',
    'onChange',
    setThemeSetting
  );
  const handleMenuCompliment = createActionHandler(
    'ThemeMenuCompliment',
    'onChange',
    setThemeMenuCompliment
  );

  return (
    <ThemeSettings>
      <ThemeSwitcher
        onChange={handleThemeSetting}
        value={themeSetting}></ThemeSwitcher>
      <ThemeMenuCompliment
        id="theme-menu-compliment"
        labelText="Compliment menu theme"
        checked={themeMenuCompliment}
        onChange={handleMenuCompliment}
      />
    </ThemeSettings>
  );
};
WithMenuCompliment.parameters = {
  layout: 'centered',
};

/**
 * WithThemeSet story for ThemeSettings
 */
export const WithThemeSet = () => {
  const [themeSetting, setThemeSetting] = useState(`system`);
  const [themeSet, setThemeSet] = useState('white/g100');

  const handleThemeSetting = createActionHandler(
    'ThemeSwitcher',
    'onChange',
    setThemeSetting
  );
  const handleThemeSet = createActionHandler(
    'ThemeSetDropdown',
    'onChange',
    setThemeSet
  );

  return (
    <ThemeSettings>
      <ThemeSwitcher
        onChange={handleThemeSetting}
        value={themeSetting}></ThemeSwitcher>
      <ThemeSetDropdown
        id="theme-dropdown"
        label="Theme set"
        titleText="Theme set"
        value={themeSet}
        onChange={handleThemeSet}
      />
    </ThemeSettings>
  );
};
WithThemeSet.parameters = {
  layout: 'centered',
};

/**
 * Complete story for ThemeSettings
 */
export const Complete = () => {
  const [themeSetting, setThemeSetting] = useState(`system`);
  const [themeMenuCompliment, setThemeMenuCompliment] = useState(false);
  const [themeSet, setThemeSet] = useState('white/g100');

  const handleThemeSetting = createActionHandler(
    'ThemeSwitcher',
    'onChange',
    setThemeSetting
  );
  const handleMenuCompliment = createActionHandler(
    'ThemeMenuCompliment',
    'onChange',
    setThemeMenuCompliment
  );
  const handleThemeSet = createActionHandler(
    'ThemeSetDropdown',
    'onChange',
    setThemeSet
  );

  return (
    <ThemeSettings>
      <ThemeSwitcher
        onChange={handleThemeSetting}
        value={themeSetting}></ThemeSwitcher>
      <ThemeMenuCompliment
        id="theme-menu-compliment"
        labelText="Compliment menu theme"
        checked={themeMenuCompliment}
        onChange={handleMenuCompliment}
      />
      <ThemeSetDropdown
        id="theme-dropdown"
        label="Theme set"
        titleText="Theme set"
        value={themeSet}
        onChange={handleThemeSet}
      />
    </ThemeSettings>
  );
};
Complete.parameters = {
  layout: 'centered',
};

const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * InContext story for ThemeSettings
 */
export const InContext = () => {
  const [themeSetting, setThemeSetting] = useState(`system`);
  const [themeMenuCompliment, setThemeMenuCompliment] = useState(false);
  const [themeSet, setThemeSet] = useState('white/g100');
  const [systemDark, setSystemDark] = useState(mediaQueryList.matches);
  const [theme, setTheme] = useState('white');
  const [themeHeader, setThemeHeader] = useState('g100');

  const handleMediaQueryEvent = (event) => {
    setSystemDark(event.matches);
  };

  useEffect(() => {
    mediaQueryList.addEventListener('change', handleMediaQueryEvent);

    return () =>
      mediaQueryList.removeEventListener('change', handleMediaQueryEvent);
  }, []);

  useEffect(() => {
    const themes = themeSet.split('/');

    if (themeSetting === 'system') {
      setTheme(systemDark ? themes[1] : themes[0]);
      setThemeHeader(
        (systemDark && !themeMenuCompliment) ||
          (!systemDark && themeMenuCompliment)
          ? themes[1]
          : themes[0]
      );
    } else {
      if (themeSetting === 'light') {
        setTheme(themes[0]);
        setThemeHeader(themeMenuCompliment ? themes[1] : themes[0]);
      } else {
        setTheme(themes[1]);
        setThemeHeader(themeMenuCompliment ? themes[0] : themes[1]);
      }
    }
  }, [systemDark, themeSetting, themeMenuCompliment, themeSet]);

  return (
    <Theme className={'theme-setting-in-context'} theme={themeHeader}>
      <header className="theme-setting-in-context__header">
        A sample header
      </header>
      <Theme as="main" className="theme-setting-in-context__main" theme={theme}>
        <ThemeSettings>
          <ThemeSwitcher
            onChange={setThemeSetting}
            value={themeSetting}></ThemeSwitcher>
          <ThemeMenuCompliment
            id="theme-menu-compliment"
            labelText="Compliment menu theme"
            checked={themeMenuCompliment}
            onChange={setThemeMenuCompliment}
          />
          <ThemeSetDropdown
            id="theme-dropdown"
            label="Theme set"
            titleText="Theme set"
            value={themeSet}
            onChange={setThemeSet}
          />
        </ThemeSettings>
      </Theme>
    </Theme>
  );
};

/**
 * InContext story for ThemeSettings
 */
export const InContextUseThemeSetting = () => {
  const [themeSetting, setThemeSetting] = useState(`system`);
  const [themeMenuCompliment, setThemeMenuCompliment] = useState(false);
  const [themeSet, setThemeSet] = useState('white/g100');
  const theme = useThemeSetting(themeSetting, themeSet, false);
  const themeHeader = useThemeSetting(
    themeSetting,
    themeSet,
    themeMenuCompliment
  );

  return (
    <Theme className={'theme-setting-in-context'} theme={themeHeader}>
      <header className="theme-setting-in-context__header">
        A sample header
      </header>
      <Theme as="main" className="theme-setting-in-context__main" theme={theme}>
        <ThemeSettings>
          <ThemeSwitcher
            onChange={setThemeSetting}
            value={themeSetting}></ThemeSwitcher>
          <ThemeMenuCompliment
            id="theme-menu-compliment"
            labelText="Compliment menu theme"
            checked={themeMenuCompliment}
            onChange={setThemeMenuCompliment}
          />
          <ThemeSetDropdown
            id="theme-dropdown"
            label="Theme set"
            titleText="Theme set"
            value={themeSet}
            onChange={setThemeSet}
          />
        </ThemeSettings>
      </Theme>
    </Theme>
  );
};
