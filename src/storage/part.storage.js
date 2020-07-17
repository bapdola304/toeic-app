import BaseStorage from './base.storage';
import * as STORAGE_KEYS from '../util/storage.keys';

function PartStorage() {
  BaseStorage.apply(this, arguments);
}

PartStorage.prototype = Object.create(BaseStorage.prototype);

PartStorage.prototype.constructor = PartStorage;

PartStorage.prototype.getPartOneInfo = function () {
  return this.get(STORAGE_KEYS.PART.ONE);
};

PartStorage.prototype.setPartOneInfo = function (data) {
  this.set(STORAGE_KEYS.PART.ONE, data);
};

PartStorage.prototype.removePartOneInfo = function () {
  this.remove(STORAGE_KEYS.PART.ONE);
};

export default new PartStorage();