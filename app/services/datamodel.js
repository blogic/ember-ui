import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service from '@ember/service';

export default class ModelService extends Service {
  @service uconfig;

  @tracked model;
  shadow = {};

  @tracked isDirty = false;

  bool_to_string(model, value) {
    if (typeof model[value] !== 'boolean') return;
    if (model[value]) model[value] = 'true';
    else model[value] = 'false';
  }

  clone_model(from, keys) {
    let ret = {};
    keys.forEach((e) => {
      ret[e] = from[e];
    });
    return ret;
  }

  clone(from) {
    from ??= {};
    let keys = this.keys || Object.keys(from);
    if (Array.isArray(keys)) {
      return this.clone_model(from, keys);
    } else {
      let ret = {};
      for (const [k, v] of Object.entries(keys)) {
        if (Array.isArray(from[k])) {
          return [...from[k]];
        }
        from[k] ??= {};
        ret[k] = this.clone_model(from[k], v);
      }
      return ret;
    }
  }

  doUpdate() {
    this.shadow = this.clone(this.model);
  }

  @action
  onReset() {
    if (typeof this.model == 'object') this.model = this.clone(this.shadow);
  }

  isObjectDirty(model, shadow, keys) {
    let dirty = false;
    keys.forEach((e) => {
      if (model[e] != shadow[e]) dirty = true;
    });
    return dirty;
  }

  isModelDirty(model, shadow, keys) {
    keys ??= Object.keys(shadow);
    let dirty = false;
    if (Array.isArray(keys)) {
      dirty = this.isObjectDirty(model, shadow, keys);
    } else {
      for (const [k, v] of Object.entries(keys))
        dirty |= this.isObjectDirty(model[k], shadow[k], v);
    }
    this.isDirty = dirty;
    return dirty;
  }

  @action
  onChange() {
    this.isModelDirty(this.model, this.shadow, this.keys);
  }
}
