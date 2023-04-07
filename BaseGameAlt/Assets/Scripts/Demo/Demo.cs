using UnityEngine;
using KyleDulce.SocketIo;

[System.Serializable]
public class ActionEvent
{
    public string ActionType;
    public float TimeElapsed;
}

public class Demo : MonoBehaviour
{
    Socket s;

    // Start is called before the first frame update
    void Start()
    {
        // s = SocketIo.establishSocketConnection("ws://localhost:3000");
        // works perfectly: s = SocketIo.establishSocketConnection("https://integrated-unity.onrender.com");
        s = SocketIo.establishSocketConnection(Application.absoluteURL);
        s.connect();

        // define reception callbacks here
        s.on("connectionstatus", call);
    }

    void call(string d) {
        Debug.Log("connectionstatus: " + Application.absoluteURL);
        s.emit("connectionstatus", Application.absoluteURL); // replace with your message

        //s.emit("testEvent", "test");
        // myObject = JsonUtility.FromJson<MyClass>(json); method to convert received JSON to object

    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            ActionEvent respObject = new ActionEvent();
            respObject.ActionType="jump";
            respObject.TimeElapsed=Time.realtimeSinceStartup;
            string respJson = JsonUtility.ToJson(respObject);
            s.emit("ActionEvent", respJson); // replace with your message
        }
    }

    void OnDestroy()
    {
        s.close();
    }

}
