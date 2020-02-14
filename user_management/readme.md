## Instructions to run
Please install the dependencies and run the service as instructed below

### Dependencies:
1. Python3 should be installed in the system.
2. Following python modules/dependencies should be installed. Below are the pip commands:
  - pip install Flask
  - pip install flask-bcrypt
  - pip install Flask-SQLAlchemy
  - pip install SQLAlchemy-Utils
  - pip install PyJWT
  - pip install psycopg2
  
3. Install Postgres with the following credentials: userid: postgres, password: 1234
4. Create 24 byte SECRET_KEY and add it as an environment variable. Same key should be present in the system running the session management module.

### To run the Service
Run the following command in the user_management folder:  
python -m src.\_\_init\_\_ or python3 -m src.\_\_init\_\_ (If you have multiple versions of python installed, run it in python3 environment).  
