import { createAppClient } from './thrift/NativeConnection';
import * as Calculator from '../../codegen/calculator';

function nativeCall(command: string): Promise<string> {
    const client: Calculator.Client<void> = createAppClient<Calculator.Client>(Calculator.Client, 'buffered', 'compact')
    console.log("Attempting nativeCall");
    client.getUser().then( user => {
        console.log("name:" + user.userName);
        console.log("id:" + user.userId);
        console.log("text:" + user.text);
    })

    client.getUser().then( user => {
        console.log("name:" + user.userName);
        console.log("id:" + user.userId);
        console.log("text:" + user.text);
    })
    console.log("Requesting additions")
    client.add(10, 20).then( result => console.log(result));
    client.add(11, 20).then( result => console.log(result));
    client.add(12, 20).then( result => console.log(result));
    client.add(13, 20).then( result => console.log(result));
    client.add(14, 20).then( result => console.log(result));
    client.add(15, 20).then( result => console.log(result));
    client.add(16, 20).then( result => console.log(result));
    return client.add(1, 1).then( result => "" + result);
} 

export { nativeCall };
