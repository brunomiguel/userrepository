export function batch(f: any, col: any, timeout: number, offset: number, batchNumber: number, finish: any) {
    var items = col.slice(offset, offset + batchNumber);

    items.forEach((item: any) => f(...item));

    var newOffset = offset + batchNumber;
    if (newOffset < col.length) {
        setTimeout(function() {
            batch(f, col, timeout, newOffset, batchNumber, finish);
        }, timeout);
    } else {
        if(finish) {
            finish();
        }
    }
}
