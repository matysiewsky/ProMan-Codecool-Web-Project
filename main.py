from flask import Flask, render_template, url_for, request, redirect, session, g
import bcrypt
from dotenv import load_dotenv
from functools import wraps


from util import json_response, hash_password
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__, static_folder="static")
load_dotenv()

app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'debugkey'


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route('/login', methods=["GET", "POST"])
def login():
    session["user_id"] = None
    message = None
    if request.method == "POST":
        user_name = str(request.form.get('user_name'))
        password = str(request.form.get('password'))
        print(user_name, password)
        user = queries.get_user_by_username(user_name)
        print(user)
        if not user:
            message = "This user doesn't exist."
            return render_template('login.html', message=message)
        if not bcrypt.checkpw(password.encode('utf-8'), user['hash'].encode('utf-8')):
            message = 'Password incorrect! Please try again.'
        else:
            session["user_name"] = user["user_name"]
            g.user = user
            return redirect('/')
    return render_template('login.html')


@app.route('/register', methods=["POST", "GET"])
def register():
    if request.method == "POST":
        user_name = str(request.form.get('user_name'))
        password = str(request.form.get('password'))
        hash = hash_password(password)
        user = queries.add_user(user_name, hash)
        print(user)
        return redirect('/')
    return render_template('register.html')


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)

    return decorated_function


@app.before_request
def load_user():
    if session.get("user_name"):
        user = queries.get_user_by_username(session["user_name"])
    else:
        user = None
    g.user = user


@app.route('/logout', methods=["GET"])
def logout():
    session.clear()
    return redirect('/')


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
