var HashTable = function(){
  this._limit = 8;
  this._count = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.resize = function(newLimit){
    var oldStore = this._storage;

    this._storage = LimitedArray(newLimit);
    this._count = 0;
    this._limit = newLimit;


    oldStore.each( function(bucket){

      if(bucket === null){
        return;
      }
      for(var i = 0; i < bucket.length; i++){
        return this.insert(bucket[i][0],bucket[i][1]);
      }

    }.bind(this));

  //   for (var i = 0; i < oldStore.length; i++) {
  //     for (var j = 0; j < oldStore[i].length; i++) {
  //       this.insert(oldStore[i][j][0],oldStore[i][j][1]);
  //     }
  //   }

  }

HashTable.prototype.insert = function(k, v){


  var i = getIndexBelowMaxForKey(k, this._limit);

  if(this._storage[i] === undefined){
    this._storage[i] = [[k,v]];
    this._count++;
  }else{
    for(var j = 0; j < this._storage[i].length; j++){
      if(this._storage[i][j][0] === k){
        this._storage[i][j][1] = v;
        return true;
      }
    }

    this._storage[i].push([k,v]);
    this._count++;
  }


  if(this._count >= this._limit * .75){
    this.resize(this._limit * 2);

  }


};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);

  if(this._storage[i] === null || this._storage[i] === undefined){
    return null;
  }

  for(var j = 0; j < this._storage[i].length; j++){
    if(this._storage[i][j][0] === k){
      return this._storage[i][j][1];
    }
  }

  return null;


};

HashTable.prototype.remove = function(k){
var i = getIndexBelowMaxForKey(k, this._limit);

  if(this._storage[i] === null || this._storage[i] === undefined){
    return null;
  }

  for(var j = 0; j < this._storage[i].length; j++){
    if(this._storage[i][j][0] === k){
      this._count--;
      var removedTuplet = this._storage[i].splice(j,1);
      // if(this._count <= this._limit * .25){
      //   this.resize(this._limit / 2);

      // }
      return removedTuplet;
    }


  }



};



/*
 * Complexity: What is the time complexity of the above functions?
 */


//storage
