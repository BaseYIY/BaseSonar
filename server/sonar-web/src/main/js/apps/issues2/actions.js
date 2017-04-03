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
import type { Dispatch } from 'redux';
import { searchIssues } from '../../api/issues';
import { receiveIssues } from '../../store/issues/duck';
import { parseIssueFromResponse } from '../../helpers/issues';
import { onFail } from '../../store/rootActions';

type Query = { [string]: string };

export const fetchIssues = (query: Query) =>
  (dispatch: Dispatch<*>) =>
    searchIssues({ ...query, additionalFields: '_all' }).then(
      response => {
        const parsedIssues = response.issues.map(issue =>
          parseIssueFromResponse(issue, response.components, response.users, response.rules));
        dispatch(receiveIssues(parsedIssues));
        return { ...response, issues: parsedIssues };
      },
      onFail(dispatch)
    );
