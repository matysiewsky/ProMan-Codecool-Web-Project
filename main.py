from flask import Flask, render_template, url_for, request
from dotenv import load_dotenv


from util import json_response
import mimetypes
import queires

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards", methods=['GET'])
@json_response
def get_boards():
    """
    All the boards
    """

    return queires.get_boards()


@app.route("/api/boards", methods=['POST'])
@json_response
def add_board():
    """
    All the boards
    """
    data = dict(request.json)
    print(data)
    board_title = data['boardTitle']
    print(board_title)
    board_id = queires.add_new_board(board_title)
    return {'id': board_id, 'title': board_title}
# CZEMU RETURN ZA KAZDYM RAZEM


@app.route("/api/<int:id>/<card_or_board>-title", methods=['POST'])
@json_response
def edit_title(id: int, card_or_board):
    """
    Edit title of existing board or card
    """
    data = dict(request.json)
    print(data)
    title = data['title']
    print(title)
    if card_or_board == "boards":
        queires.edit_board_title(title, id)
    else:
        queires.edit_card_title(title, id)

    return {'id': id, 'title': title}


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queires.get_cards_for_board(board_id)


@app.route("/api/boards/<int:board_id>/new_card/", methods=['POST'])
@json_response
def create_new_card(board_id: int):
    """
    Create and add new card to existing board
    :param board_id: id of the parent board
    """
    data = dict(request.json)
    card_title = data['cardTitle']
    status_id = 1
    card_order = 1
    card_id = queires.add_new_card(card_title, status_id, card_order, board_id)
    return {'id': card_id[0], 'title': card_title}

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
