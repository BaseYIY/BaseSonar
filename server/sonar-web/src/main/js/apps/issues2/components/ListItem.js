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
import ComponentBreadcrumbs from './ComponentBreadcrumbs';
import Issue from '../../../components/issue/Issue';
import type { Issue as IssueType } from '../../../components/issue/types';
import type { Component } from '../utils';

type Props = {
  component?: Component,
  issue: IssueType,
  previousIssue: ?Object
};

export default class ListItem extends React.PureComponent {
  props: Props;

  render() {
    const { component, issue, previousIssue } = this.props;

    const displayComponent = previousIssue == null || previousIssue.component !== issue.component;

    return (
      <div className="issues-workspace-list-item">
        {displayComponent &&
          <div className="issues-workspace-list-component">
            <ComponentBreadcrumbs component={component} issue={this.props.issue} />
          </div>}
        <Issue {...this.props} />
      </div>
    );
  }
}
