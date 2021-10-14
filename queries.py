import data_manager
import connection


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})
    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


@connection.connection_handler
def add_user(cursor, username, hash):
    query = """
    INSERT INTO users
        (username, hash, registration_date)
        VALUES (%s, %s, CURRENT_TIMESTAMP)
    """
    cursor.execute(query, [username, hash])


@connection.connection_handler
def get_user_by_id(cursor, user_id):
    query = """
    SELECT id, username, hash, registration_date
    FROM users
    WHERE id == %s"""
    cursor.execute(query, [user_id])
