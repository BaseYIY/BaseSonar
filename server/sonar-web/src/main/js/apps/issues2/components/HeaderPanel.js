/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// @flow
import React from 'react';
import { css } from 'glamor';
import { clearfix } from 'glamor/utils';

type Props = {|
  border: boolean,
  children?: React.Element<*>
|};

const HeaderPanel = (props: Props) => (
  <div
    className={css(clearfix(), {
      height: 56,
      lineHeight: '24px',
      margin: '-20px -20px 20px',
      padding: '16px 20px',
      borderBottom: props.border ? '1px solid #e6e6e6' : undefined,
      boxSizing: 'border-box',
      backgroundColor: '#f3f3f3',
      '& .component-name': { lineHeight: '24px' }
    })}>
    {props.children}
  </div>
);

export default HeaderPanel;
