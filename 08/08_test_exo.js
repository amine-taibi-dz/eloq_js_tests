//Retry
function primitiveMultiply(a, b) {
    if (Math.random() <= .2) {
        let res = new Number(a * b);
        return res;
    } else {
        throw new MultiplicatorUnitFailure(`Error on multiply ${a}*${b}`);
    }
}
class MultiplicatorUnitFailure extends Error { }
function retryMult(a, b) {
    for (; ;) {
        try {
            return primitiveMultiply(a, b);
        } catch (error) {
            if (error instanceof MultiplicatorUnitFailure) {
                console.log("retry");
            } else {
                throw error;
            }
        }
    }
}
console.log(retryMult(5, 10));
console.log(retryMult(5, true));

//The locked box
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};
function withBoxUnlocked(func,val) {
    let locked = box.locked;
    if (!locked) {
        try {
            return func(box.content,val);      
        } catch (error) {
            console.error(error); 
        }
      
    }
    box.unlock();
    try {
        func(box.content,val);
        console.log(box.content);    
    } catch (error) {
        console.error(error);
    }finally{
        box.lock();
    }
    
} 

withBoxUnlocked((a,b)=> a.push(b),20);
withBoxUnlocked((a,b)=> a.push(b),30);
box.unlock();
withBoxUnlocked((a,b)=> {throw  new Error("bla bla");a.push(b);},10);

withBoxUnlocked((a,b)=> a.push(b),40);
withBoxUnlocked((a,b)=> a.push(b),50);
console.log(box);
