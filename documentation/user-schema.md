# User Schema in Mongo
```
{
    _id: ObjectId
    username: str,
    password: str [encrypted],
    email: str,
    firstName: str,
    lastName: str,
    token: ObjectId
}
```

// TODO: We can either use a permanent token in which we set the token upon creation
OR we could set the token dynamically upon login and validate that way.