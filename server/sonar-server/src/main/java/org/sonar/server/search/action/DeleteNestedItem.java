/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2014 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
package org.sonar.server.search.action;

import org.elasticsearch.action.update.UpdateRequest;
import org.sonar.server.search.Index;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class DeleteNestedItem<K extends Serializable> extends IndexAction<UpdateRequest> {

  private final K key;
  private final Object item;
  private final Object[] items;

  public DeleteNestedItem(String indexType, K key, Object item, Object... items) {
    super(indexType);
    this.key = key;
    this.item = item;
    this.items = items;
  }

  @Override
  public String getKey() {
    return this.key.toString();
  }

  @Override
  public Class getPayloadClass() {
    return item.getClass();
  }

  @Override
  public List<UpdateRequest> doCall(Index index) throws Exception {
    List<UpdateRequest> updates = new ArrayList<UpdateRequest>();
    updates.addAll(deleteItem(index, item, key));
    for (Object otherItem : items) {
      updates.addAll(deleteItem(index, otherItem, key));
    }
    return updates;
  }

  private List<UpdateRequest> deleteItem(Index index, Object item, K key) {
    List<UpdateRequest> updates = index.getNormalizer().deleteNested(item, key);
    for (UpdateRequest update : updates) {
      update.index(index.getIndexName())
        .type(index.getIndexType())
        .refresh(needsRefresh());
    }
    return updates;
  }
}
